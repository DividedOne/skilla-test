import { isToday, isYesterday } from "date-fns";
import { type FC } from "react";

type DateHeadingProps = {
  callDate: string;
  amountOfCallsForDate: number;
};

export const DateHeading: FC<DateHeadingProps> = ({
  callDate,
  amountOfCallsForDate,
}) => {
  if (isToday(callDate)) {
    return null;
  }

  if (isYesterday(callDate)) {
    return (
      <div className="table-divisor px-10 pb-4 pt-6 text-[15px]/[21.75px] text-primary">
        <div className="relative w-fit">
          Вчера
          <div className="absolute -right-4 top-0 text-xs text-tertiary">
            {amountOfCallsForDate}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="table-divisor relative px-10 pb-4 pt-6 text-lg text-primary">
      <div className="relative w-fit">
        {callDate}
        <div className="absolute -right-4 top-0 text-xs text-tertiary">
          {amountOfCallsForDate}
        </div>
      </div>
    </div>
  );
};
