import { type FC } from "react";
import { tableHeadings } from "./constants";

type CallsTableProps = {
  calls: any;
};

export const CallsTable: FC<CallsTableProps> = ({ calls }) => {
  return (
    <div>
      {/* row */}
      <div className="grid-cols-table ml-10 grid border-b border-[#EAF0FA] py-[22px] pr-10 text-sm text-secondary">
        {tableHeadings.map((heading, idx) => (
          <span key={idx} className="last:text-right">
            {heading}
          </span>
        ))}
        {/* rows */}
      </div>
      {calls.map((call) => (
        <div className="grid-cols-table ml-10 grid items-center border-b border-[#EAF0FA] py-5 pr-10 text-sm font-normal last:border-b-0">
          <span key={call.id}>{call.callType}</span>
          <span key={call.id} className="text-[15px]/[21px] text-primary">
            {call.time}
          </span>
          <span key={call.id} className="size-8 rounded-full bg-sky-500">
            {/* avatar */}
          </span>
          <span key={call.id} className="text-[15px]/[21px] text-primary">
            {call.fromUser}
          </span>
          <span key={call.id} className="text-[15px]/[21px] text-secondary">
            {call.source}
          </span>
          <span key={call.id}>{call.mark}</span>
          <span
            key={call.id}
            className="text-right text-[15px]/[21px] text-primary"
          >
            {call.duration}
          </span>
          {/* rows */}
        </div>
      ))}
    </div>
  );
};

// {
//   /* headings */
// }
// <div className="grid grid-cols-7 whitespace-nowrap px-10 py-5 text-sm font-normal text-secondary last:text-right">
//   {tableHeadings.map((heading, idx) => (
//     <span key={idx}>{heading}</span>
//   ))}
// </div>;
// {
//   /* rows */
// }
// <div className="grid grid-cols-7 whitespace-nowrap px-10 py-5 text-sm font-normal text-primary last:text-right">
//   {calls.map((call) => (
//     <span key={call.id}>{call.id}</span>
//   ))}
// </div>;
