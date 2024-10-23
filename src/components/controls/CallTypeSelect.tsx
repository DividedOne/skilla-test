import { useState, type FC } from "react";
import { ArrowUp } from "../icons/ArrowUp";

type CallTypeSelectProps = {};

type CallType = "Все типы" | "Входящие" | "Исходящие";

export const CallTypeSelect: FC<CallTypeSelectProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCallType, setSelectedCallType] =
    useState<CallType>("Все типы");

  return (
    <div
      role="button"
      onClick={() => setIsOpen(!isOpen)}
      className="relative inline-flex min-w-[130px] items-center gap-1 rounded-lg bg-transparent text-sm/[14px] text-secondary"
    >
      {selectedCallType}
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
              setSelectedCallType("Все типы");
              setIsOpen(false);
            }}
          >
            Все типы
          </button>
          <button
            className="w-full px-3 py-[7px] text-left text-xs/[18px] text-muted transition-colors duration-150 hover:bg-hover focus-visible:bg-hover"
            onClick={() => {
              setSelectedCallType("Входящие");
              setIsOpen(false);
            }}
          >
            Входящие
          </button>
          <button
            className="w-full px-3 py-[7px] text-left text-xs/[18px] text-muted transition-colors duration-150 hover:bg-hover focus-visible:bg-hover"
            onClick={() => {
              setSelectedCallType("Исходящие");
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
