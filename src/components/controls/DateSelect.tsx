import { type FC } from "react";
import { ArrowUp } from "../icons/ArrowUp";
import { Calendar } from "../icons/Calendar";

type DateSelectProps = {};

export const DateSelect: FC<DateSelectProps> = ({}) => {
  return (
    <div className="flex max-w-[135px] items-center justify-center gap-3">
      <button className="group -rotate-90">
        <ArrowUp className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
      </button>
      <button className="group flex items-center gap-2">
        <Calendar className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
        <span className="text-sm/[16px] text-accent">3 дня</span>
      </button>
      <button className="group rotate-90">
        <ArrowUp className="fill-[#ADBFDF] transition-colors duration-150 group-hover:fill-accent group-focus-visible:fill-accent" />
      </button>
    </div>
  );
};
