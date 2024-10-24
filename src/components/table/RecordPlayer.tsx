import { useEffect, useRef, useState, type FC } from "react";
import { DownloadIcon } from "../icons/Download";
import { XIcon } from "../icons/XIcon";
import { AUDIO_API_URL, token } from "../../data/constants";
import { RecordProgress } from "./RecordProgress";
import { getTimeFromSeconds } from "../../utils/helpers";
import { Play } from "../icons/Play";
import { Pause } from "../icons/Pause";
import { ArrowUp } from "../icons/ArrowUp";

type RecordPlayerProps = {
  recordId: string;
  partnershipId: string;
  duration: number;
};

export const RecordPlayer: FC<RecordPlayerProps> = ({
  recordId,
  duration,
  partnershipId,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [shouldDownload, setShouldDownload] = useState(false);
  const [audioRecordURI, setAudioRecordURI] = useState<string>();
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLAudioElement>(null);

  const handleIsPlayingChange = () => {
    if (!playerRef.current) return;

    if (!isPlaying) {
      void playerRef.current.play();
      setIsPlaying(true);
    } else {
      playerRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!shouldDownload) return;

    async function fetchAudioRecord() {
      const response = await fetch(
        `${AUDIO_API_URL}?record=${recordId}&partnership_id=${partnershipId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type":
              "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
            "Content-Transfer-Encoding": "binary",
            "Content-Disposition": "filename='record.mp3'",
          },
        },
      );

      const blob = await response.blob();

      return blob;
    }

    fetchAudioRecord().then((blob) => {
      const url = URL.createObjectURL(blob);

      setAudioRecordURI(url);
      setShouldDownload(false);
    });
  }, [shouldDownload]);

  return (
    <div className="justify-items-end">
      <div className="flex max-w-[400px] items-center rounded-full bg-[#EAF0FA] px-5 py-[11px]">
        <div className="text-[15px]/[20px] text-primary">
          {getTimeFromSeconds(duration)}
        </div>
        {/* play */}
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className="group inline-flex size-6 -rotate-90 items-center justify-center"
          >
            <ArrowUp className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
          </button>
        ) : (
          <>
            <button
              disabled={!audioRecordURI}
              onClick={handleIsPlayingChange}
              className="group relative ml-3 mr-2 inline-flex size-6 rounded-full bg-white disabled:cursor-not-allowed"
            >
              {isPlaying ? (
                <Pause className="fill-accent group-disabled:fill-accent/40" />
              ) : (
                <Play className="fill-accent group-disabled:fill-accent/40" />
              )}
            </button>
            <RecordProgress duration={duration} isPlaying={isPlaying} />
            <button
              disabled={!!audioRecordURI}
              onClick={() => setShouldDownload(true)}
              className="group mx-2 inline-flex size-6 items-center justify-center disabled:cursor-not-allowed"
            >
              <DownloadIcon className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent group-disabled:fill-accent/40" />
            </button>
            <button
              onClick={() => {
                if (playerRef.current) playerRef.current.pause();
                setIsPlaying(false);
                setIsCollapsed(true);
              }}
              className="group inline-flex size-6 items-center justify-center"
            >
              <XIcon className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
            </button>
          </>
        )}
      </div>
      {!!audioRecordURI && <audio ref={playerRef} src={audioRecordURI} />}
    </div>
  );
};
