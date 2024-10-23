import { type FC } from "react";

type CallMarkBadgeProps = {
  mark: string;
};

export const CallMarkBadge: FC<CallMarkBadgeProps> = ({ mark }) => {
  if (mark === "") return mark;

  if (mark === "Скрипт не использован")
    return <span className="text-accent-red">Скрипт не использован</span>;

  if (mark === "Плохо")
    return (
      <div className="flex h-[26px] w-[70px] items-center justify-center rounded-[4px] border border-accent-red bg-light-red px-2 py-[6px] text-sm/[14px] text-accent-red">
        Плохо
      </div>
    );

  if (mark === "Хорошо")
    return (
      <div className="flex h-[26px] w-[70px] items-center justify-center rounded-[4px] border border-[#ADBFDF] bg-[#D8E4FB] px-2 py-[6px] text-sm/[14px] text-primary">
        Хорошо
      </div>
    );

  if (mark === "Отлично")
    return (
      <div className="flex h-[26px] w-[70px] items-center justify-center rounded-[4px] border border-accent-green bg-light-green px-2 py-[6px] text-sm/[14px] text-accent-green">
        Отлично
      </div>
    );

  return null;
};
