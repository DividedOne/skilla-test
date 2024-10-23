import { type FC } from "react";
import type { CallInOut, CallStatus } from "../../App";

type CallTypeIconProps = {
  callInOut: CallInOut;
  callStatus: CallStatus;
};

export const CallTypeIcon: FC<CallTypeIconProps> = ({
  callInOut,
  callStatus,
}) => {
  if (callInOut === "in") {
    if (callStatus === "answered") {
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5217 1.17704L11.3447 0L1.66957 9.67513V4.17391H0V12.5217H8.34783V10.8522H2.84661L12.5217 1.17704Z"
            fill="#002CFB"
          />
        </svg>
      );
    }
    return (
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5217 1.17704L11.3447 0L1.66957 9.67513V4.17391H0V12.5217H8.34783V10.8522H2.84661L12.5217 1.17704Z"
          fill="#EA1A4F"
        />
      </svg>
    );
  }

  if (callInOut === "out") {
    if (callStatus === "answered") {
      return (
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-1.04904e-05 11.3447L1.17703 12.5217L10.8522 2.8466L10.8522 8.34782H12.5217L12.5217 -1.04904e-05L4.1739 -1.04904e-05V1.66955L9.67512 1.66955L-1.04904e-05 11.3447Z"
            fill="#28A879"
          />
        </svg>
      );
    }
    return (
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.00023365 11.3447L1.17728 12.5217L10.8524 2.8466L10.8524 8.34782H12.522L12.522 -1.04904e-05L4.17415 -1.04904e-05V1.66955L9.67536 1.66955L0.00023365 11.3447Z"
          fill="#EA1A4F"
        />
      </svg>
    );
  }

  return null;
};
