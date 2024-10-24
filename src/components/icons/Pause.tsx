import { type FC } from "react";

type PauseProps = {
  className?: string;
};

export const Pause: FC<PauseProps> = ({ className }) => {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 top-1/2 -translate-x-[4px] -translate-y-[4px]"
    >
      <path
        d="M0 8H2.66667V0H0V8ZM5.33333 0V8H8V0H5.33333Z"
        className={className}
      />
    </svg>
  );
};
