import { useEffect, useState, type FC } from "react";
import { getTimeFromSeconds } from "../../utils/helpers";

type RecordProgressProps = {
  duration: number;
  isPlaying: boolean;
};

export const RecordProgress: FC<RecordProgressProps> = ({
  duration,
  isPlaying,
}) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const percentInSecond = 100 / duration;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      progress < 100 && setProgress((prev) => prev + percentInSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [progress, isPlaying]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-1 min-w-[160px] rounded-full bg-[#ADBFDF]"
    >
      <div
        className="absolute left-0 top-0 h-full rounded-full bg-[#002CFB]"
        style={{ width: `${progress}%` }}
      />
      {isHovered && (
        <div className="absolute -top-5 text-sm text-primary">
          {getTimeFromSeconds(Math.round(progress / percentInSecond))}
        </div>
      )}
    </div>
  );
};
