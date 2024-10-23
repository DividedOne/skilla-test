import { type FC } from "react";
import { DownloadIcon } from "../icons/Download";
import { XIcon } from "../icons/XIcon";

type RecordPlayerProps = {
  recordId: string;
  duration: string;
};

export const RecordPlayer: FC<RecordPlayerProps> = ({ recordId, duration }) => {
  return (
    <div className="justify-items-end">
      <div className="flex max-w-[400px] items-center rounded-full bg-[#EAF0FA] px-5 py-[11px]">
        <div className="text-[15px]/[20px] text-primary">{duration}</div>
        {/* play */}
        <button className="relative ml-3 mr-2 inline-flex size-6 rounded-full bg-white">
          <svg
            width="8"
            height="10"
            viewBox="0 0 8 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 top-1/2 -translate-x-[3px] -translate-y-[5px]"
          >
            <path
              d="M0.287422 0.0693819C0.376104 0.0231631 0.475355 0 0.574754 0C0.673886 0 0.773106 0.0231631 0.862176 0.0693819L7.71255 4.55186C7.89006 4.64422 8 4.81521 8 5.00008C8 5.18493 7.89036 5.3559 7.71255 5.44814L0.862176 9.93081C0.684394 10.0231 0.465233 10.0231 0.287571 9.93081C0.109759 9.83824 0 9.6672 0 9.48246V0.51755C0 0.332781 0.10958 0.16182 0.287422 0.0693819Z"
              fill="#002CFB"
            />
          </svg>
        </button>
        <div className="h-1 min-w-[160px] rounded-full bg-[#ADBFDF]" />
        {/* download */}
        <button className="group mx-2 inline-flex size-6 items-center justify-center">
          <DownloadIcon className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
        </button>
        {/* x */}
        <button className="group inline-flex size-6 items-center justify-center">
          <XIcon className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
        </button>
      </div>
    </div>
  );
};
