import { type Dispatch, type SetStateAction, type FC } from "react";
import { ArrowUp } from "../icons/ArrowUp";
import { Calendar } from "../icons/Calendar";
import type { Period, QParams } from "../../utils/types";
import { useHandleClickOutside } from "../../utils/hooks/useHandleClickOutside";

type DateSelectProps = {
  period: Period;
  setQParams: Dispatch<SetStateAction<QParams>>;
};

export const DateSelect: FC<DateSelectProps> = ({ period, setQParams }) => {
  const { ref, isVisible, setIsVisible } = useHandleClickOutside(false);

  const possiblePeriods: Period[] = ["3 дня", "Неделя", "Месяц", "Год"];

  const periodsWithoutCurrent = possiblePeriods.filter((p) => p !== period);

  return (
    <div className="flex max-w-[135px] items-center justify-center gap-3">
      <button className="group -rotate-90">
        <ArrowUp className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
      </button>
      <div
        role="button"
        ref={ref}
        onClick={() => setIsVisible(!isVisible)}
        className="group relative flex items-center gap-2"
      >
        <Calendar className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
        <span className="text-sm/[16px] text-accent">{period}</span>
        {isVisible && (
          <div className="shadow-date-select absolute left-0 top-0 isolate z-10 w-[200px] -translate-x-[calc(50%+6px)] overflow-hidden rounded border border-[#EAF0FA] bg-white text-left text-sm/[21px]">
            <button className="inline-flex w-full px-[21px] py-2 text-accent hover:bg-[#002CFB]/[13%] hover:text-primary">
              {period}
            </button>
            {periodsWithoutCurrent.map((period) => (
              <button
                key={period}
                onClick={() => {
                  setQParams((prevState) => ({
                    ...prevState,
                    period,
                  }));
                  setIsVisible(false);
                }}
                className="inline-flex w-full px-[21px] py-2 text-tertiary hover:bg-[#002CFB]/[13%] hover:text-primary"
              >
                {period}
              </button>
            ))}
          </div>
        )}
      </div>
      <button className="group rotate-90">
        <ArrowUp className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
      </button>
    </div>
  );
};
