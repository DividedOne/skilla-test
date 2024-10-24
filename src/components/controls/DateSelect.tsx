import { type Dispatch, type SetStateAction, type FC } from "react";
import { ArrowUp } from "../icons/ArrowUp";
import { Calendar } from "../icons/Calendar";
import type { Period, QParams } from "../../utils/types";
import { useHandleClickOutside } from "../../utils/hooks/useHandleClickOutside";

import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

type DateSelectProps = {
  period: Period;
  setQParams: Dispatch<SetStateAction<QParams>>;
  manualStartDate: string | null;
  manualEndDate: string | null;
};

export const DateSelect: FC<DateSelectProps> = ({
  period,
  setQParams,
  manualEndDate,
  manualStartDate,
}) => {
  const { isVisible, setIsVisible } = useHandleClickOutside(false);

  const possiblePeriods: Period[] = ["3 дня", "Неделя", "Месяц", "Год"];

  const periodsWithoutCurrent = possiblePeriods.filter((p) => p !== period);

  const handleNextPeriod = () => {
    if (manualStartDate && manualEndDate) {
      setQParams((prevState) => ({
        ...prevState,
        period: possiblePeriods[0],
        manualStartDate: null,
        manualEndDate: null,
      }));
      return;
    }

    const index = possiblePeriods.indexOf(period);

    if (index === possiblePeriods.length - 1) {
      setQParams((prevState) => ({
        ...prevState,
        period: periodsWithoutCurrent[0],
      }));
    } else {
      setQParams((prevState) => ({
        ...prevState,
        period: possiblePeriods[index + 1],
      }));
    }
  };

  const handlePrevPeriod = () => {
    if (manualStartDate && manualEndDate) {
      setQParams((prevState) => ({
        ...prevState,
        period: possiblePeriods[0],
        manualStartDate: null,
        manualEndDate: null,
      }));
      return;
    }

    const index = possiblePeriods.indexOf(period);

    if (index === 0) {
      setQParams((prevState) => ({
        ...prevState,
        period: periodsWithoutCurrent[periodsWithoutCurrent.length - 1],
      }));
    } else {
      setQParams((prevState) => ({
        ...prevState,
        period: possiblePeriods[index - 1],
      }));
    }
  };

  return (
    <div className="flex max-w-[300px] items-center justify-center gap-3">
      <button onClick={handlePrevPeriod} className="group -rotate-90">
        <ArrowUp className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
      </button>
      <div
        role="button"
        // ref={ref}
        onClick={() => setIsVisible(!isVisible)}
        className="group relative flex items-center gap-2"
      >
        <Calendar className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
        <span className="text-sm/[16px] text-accent">
          {manualStartDate && manualEndDate ? (
            <span className="text-xs">
              {manualStartDate}
              <span className="text-[#ADBFDF]">{" - "}</span>
              {manualEndDate}
            </span>
          ) : (
            <span>{period}</span>
          )}
        </span>
        {isVisible && (
          <div
            className={`${manualStartDate && manualEndDate ? "w-[300px] -translate-x-[34%]" : "w-[200px] -translate-x-[calc(50%+6px)]"} absolute left-0 top-0 isolate z-10 w-[200px] overflow-hidden rounded border border-[#EAF0FA] bg-white text-left text-sm/[21px] shadow-date-select`}
          >
            <button className="inline-flex w-full px-[21px] py-2 text-accent hover:bg-[#002CFB]/[13%] hover:text-primary">
              {manualStartDate && manualEndDate ? (
                <span className="text-xs">
                  {manualStartDate}
                  <span className="text-[#ADBFDF]">{" - "}</span>
                  {manualEndDate}
                </span>
              ) : (
                <span>{period}</span>
              )}
            </button>
            {manualStartDate &&
              manualEndDate &&
              possiblePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setQParams((prevState) => ({
                      ...prevState,
                      period,
                      manualStartDate: null,
                      manualEndDate: null,
                    }));
                    setIsVisible(false);
                  }}
                  className="inline-flex w-full px-[21px] py-2 text-tertiary hover:bg-[#002CFB]/[13%] hover:text-primary"
                >
                  {period}
                </button>
              ))}
            {!(manualStartDate && manualEndDate) &&
              periodsWithoutCurrent.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setQParams((prevState) => ({
                      ...prevState,
                      period,
                      manualStartDate: null,
                      manualEndDate: null,
                    }));
                    setIsVisible(false);
                  }}
                  className="inline-flex w-full px-[21px] py-2 text-tertiary hover:bg-[#002CFB]/[13%] hover:text-primary"
                >
                  {period}
                </button>
              ))}
            <div
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-px px-[21px] py-2 text-tertiary hover:bg-[#002CFB]/[13%] hover:text-primary"
            >
              <RangePicker
                className="border-none focus-visible:outline-none"
                placeholder={["", ""]}
                format="DD.MM.YY"
                onReset={() => {
                  setQParams((prevState) => ({
                    ...prevState,
                    manualStartDate: null,
                    manualEndDate: null,
                  }));
                }}
                onChange={(dates) => {
                  const newManualEndDate = `${dates?.[0]?.year()}-${(dates?.[0]?.month() ?? 0) + 1}-${dates?.[0]?.date()}`;
                  const newManualStartDate = `${dates?.[1]?.year()}-${(dates?.[1]?.month() ?? 0) + 1}-${dates?.[1]?.date()}`;

                  setQParams((prevState) => ({
                    ...prevState,
                    manualStartDate: newManualStartDate,
                    manualEndDate: newManualEndDate,
                  }));
                  setIsVisible(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
      <button onClick={handleNextPeriod} className="group rotate-90">
        <ArrowUp className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
      </button>
    </div>
  );
};
