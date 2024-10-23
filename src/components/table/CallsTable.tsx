import { type FC } from "react";
import { tableHeadings } from "./constants";
import { CallTypeIcon } from "../icons/CallTypeIcon";
import { Calls } from "../../App";
import { CallMarkBadge } from "./CallMarkBadge";

type CallsTableProps = {
  calls: Calls;
};

export const CallsTable: FC<CallsTableProps> = ({ calls }) => {
  return (
    <div>
      {/* headings */}
      <div className="grid-cols-table ml-10 grid items-center gap-1 border-b border-[#EAF0FA] pb-[21px] pr-10 pt-[24px] text-sm text-secondary/[87%]">
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
          className="grid-cols-table xl ml-10 grid items-center gap-1 border-b border-[#EAF0FA] py-4 pr-10 text-sm font-normal last:border-b-0 hover:cursor-pointer hover:bg-[#F1F4F9]"
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
          <div className="text-right text-[15px]/[21px] text-primary">
            {call.duration}
          </div>
        </div>
      ))}
    </div>
  );
};
