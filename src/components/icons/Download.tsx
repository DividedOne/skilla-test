import { type FC } from "react";

type DownloadIconProps = {
  className?: string;
};

export const DownloadIcon: FC<DownloadIconProps> = ({ className }) => {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 16H13V14.1176H0V16ZM13 5.64706H9.28571V0H3.71429V5.64706H0L6.5 12.2353L13 5.64706Z"
        className={className}
      />
    </svg>
  );
};
