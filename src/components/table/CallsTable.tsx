import { type FC } from "react";
import { tableHeadings } from "./constants";
import { CallTypeIcon } from "../icons/CallTypeIcon";
import { CallMarkBadge } from "./CallMarkBadge";
import type { Calls } from "../../data/types";
import { RecordPlayer } from "./RecordPlayer";

type CallsTableProps = {
  calls: Calls;
};

export const CallsTable: FC<CallsTableProps> = ({ calls }) => {
  return (
    <div>
      {/* headings */}
      <div className="table-divisor grid grid-cols-table items-center gap-1 px-10 pb-[22px] pt-[24px] text-sm text-secondary/[87%]">
        {tableHeadings.map((heading) => (
          <div key={heading} className="last:text-right">
            {heading}
          </div>
        ))}
      </div>
      {/* rows */}
      {calls.map((call) => (
        <div
          key={call.id}
          className={`${call.recordId ? "py-[10px]" : "py-[16px]"} table-divisor grid min-h-[65px] grid-cols-table items-center gap-[5px] px-10 text-sm font-normal last:border-b-0 hover:cursor-pointer hover:bg-[#F1F4F9]`}
        >
          <div className="pl-1">
            <CallTypeIcon callInOut={call.callInOut} callStatus={call.status} />
          </div>
          <div className="text-[15px]/[21px] text-primary">{call.date}</div>
          <img
            src={call.userAvatar}
            alt="avatar"
            className="size-8 rounded-full"
          />
          <div className="text-[15px]/[21px] text-primary">{call.number}</div>
          <div className="text-[15px]/[21px] text-secondary">{call.source}</div>
          <div>
            <CallMarkBadge mark={call.mark} />
          </div>
          {call.recordId ? (
            <RecordPlayer recordId={call.recordId} duration={call.duration} />
          ) : (
            <div className="text-right text-[15px]/[21px] text-primary">
              {call.duration}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
