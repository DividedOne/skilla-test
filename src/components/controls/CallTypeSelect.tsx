import { useState, type FC, type Dispatch, type SetStateAction } from "react";
import { ArrowUp } from "../icons/ArrowUp";
import type { CallFilter } from "../../App";

type CallTypeSelectProps = {
  currentFilter: CallFilter | null;
  setCurrentFilter: Dispatch<SetStateAction<CallFilter | null>>;
};

export const CallTypeSelect: FC<CallTypeSelectProps> = ({
  currentFilter,
  setCurrentFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      role="button"
      onClick={() => setIsOpen(!isOpen)}
      className="relative inline-flex min-w-[130px] items-center gap-1 rounded-lg bg-transparent text-sm/[14px] text-secondary"
    >
      {currentFilter ? currentFilter : "Все типы"}
      <div
        className={`${isOpen ? "" : "rotate-180"} transition-all duration-150`}
      >
        <ArrowUp
          className={`${isOpen ? "fill-[#002CFB]" : "fill-[#ADBFDF]"}`}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+12px)] rounded-lg bg-white shadow-dropdown">
          <button
            className="w-full px-3 py-[7px] text-left text-xs/[18px] text-muted transition-colors duration-150 hover:bg-hover focus-visible:bg-hover"
            onClick={() => {
              setCurrentFilter(null);
              setIsOpen(false);
            }}
          >
            Все типы
          </button>
          <button
            className="w-full px-3 py-[7px] text-left text-xs/[18px] text-muted transition-colors duration-150 hover:bg-hover focus-visible:bg-hover"
            onClick={() => {
              setCurrentFilter("Входящие");
              setIsOpen(false);
            }}
          >
            Входящие
          </button>
          <button
            className="w-full px-3 py-[7px] text-left text-xs/[18px] text-muted transition-colors duration-150 hover:bg-hover focus-visible:bg-hover"
            onClick={() => {
              setCurrentFilter("Исходящие");
              setIsOpen(false);
            }}
          >
            Исходящие
          </button>
        </div>
      )}
    </div>
  );
};
