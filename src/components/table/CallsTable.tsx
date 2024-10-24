import { Dispatch, SetStateAction, type FC } from "react";
import { CallTypeIcon } from "../icons/CallTypeIcon";
import { CallMarkBadge } from "./CallMarkBadge";
import type { Calls } from "../../data/types";
import { RecordPlayer } from "./RecordPlayer";
import { getTimeFromSeconds } from "../../utils/helpers";
import { DateHeading } from "./DateHeading";
import { ArrowDown } from "../icons/ArrowDown";
import type { Order, QParams, SortBy } from "../../utils/types";

type CallsTableProps = {
  calls: Calls;
  sortBy: SortBy;
  order: Order;
  setQParams: Dispatch<SetStateAction<QParams>>;
};

export const CallsTable: FC<CallsTableProps> = ({
  calls,
  sortBy,
  order,
  setQParams,
}) => {
  const handleFilterChange = (
    currentSortBy: SortBy,
    newSortBy: SortBy,
    order: Order,
  ) => {
    const newOrder: Order =
      currentSortBy === newSortBy ? (order === "ASC" ? "DESC" : "ASC") : order;

    setQParams((prev) => {
      return {
        ...prev,
        sortBy: newSortBy,
        order: newOrder,
      };
    });
  };

  return (
    <div>
      {/* headings */}
      <div className="table-divisor grid grid-cols-table items-center gap-1 px-10 pb-[22px] pt-[24px] text-sm text-secondary/[87%]">
        <div>Тип</div>
        <button
          onClick={() => handleFilterChange(sortBy, "date", order)}
          className="relative inline-flex"
        >
          <span>Время</span>
          <span
            className={`${order === "ASC" && sortBy === "date" && "rotate-180"} absolute right-6 top-1/2 -translate-y-1/2 transition-transform duration-150`}
          >
            <ArrowDown className="fill-[#ADBFDF]" />
          </span>
        </button>
        <div>Сотрудник</div>
        <div>Звонок</div>
        <div>Источник</div>
        <div>Оценка</div>
        <button
          onClick={() => handleFilterChange(sortBy, "duration", order)}
          className="relative inline-flex justify-end"
        >
          <span>Длительность</span>
          <span
            className={`${order === "ASC" && sortBy === "duration" && "rotate-180"} absolute -right-5 top-1/2 -translate-y-1/2 transition-transform duration-150`}
          >
            <ArrowDown className="fill-[#ADBFDF]" />
          </span>
        </button>
      </div>
      {/* rows */}
      {Object.entries(calls).map(([callDate, calls]) => (
        <div key={callDate} className="grid">
          <DateHeading
            callDate={callDate}
            amountOfCallsForDate={calls.length}
          />
          {calls.map((call) => (
            <div
              key={call.id}
              className={`${call.recordId ? "py-[10px]" : "py-[16px]"} table-divisor grid min-h-[65px] grid-cols-table items-center gap-[5px] px-10 text-sm font-normal last:border-b-0 hover:cursor-pointer hover:bg-[#F1F4F9]`}
            >
              <div className="pl-1">
                <CallTypeIcon
                  callInOut={call.callInOut}
                  callStatus={call.status}
                />
              </div>
              <div className="text-[15px]/[21px] text-primary">{call.date}</div>
              <img
                src={call.userAvatar}
                alt="avatar"
                className="size-8 rounded-full"
              />
              {call.company && call.name && (
                <div className="flex flex-col text-[15px]/[21px] text-primary">
                  <span>{call.name}</span>
                  <span className="text-secondary">{call.company}</span>
                </div>
              )}

              {call.name && (
                <div className="flex flex-col text-[15px]/[21px] text-primary">
                  <span>{call.name}</span>
                  <span className="text-secondary">{call.number}</span>
                </div>
              )}
              {!(call.company && call.name) && (
                <div className="text-[15px]/[21px] text-primary">
                  {call.number}
                </div>
              )}
              <div className="text-[15px]/[21px] text-secondary">
                {call.source}
              </div>
              <div>
                <CallMarkBadge mark={call.mark} />
              </div>
              {call.recordId ? (
                <RecordPlayer
                  recordId={call.recordId}
                  duration={call.duration}
                  partnershipId={call.partnershipId}
                />
              ) : (
                <div className="text-right text-[15px]/[21px] text-primary">
                  {getTimeFromSeconds(call.duration)}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
