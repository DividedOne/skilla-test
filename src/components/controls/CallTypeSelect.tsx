import { type FC, type Dispatch, type SetStateAction } from "react";
import { ArrowUp } from "../icons/ArrowUp";
import type { CallFilter, QParams } from "../../utils/types";
import { useHandleClickOutside } from "../../utils/hooks/useHandleClickOutside";
import { SmallXIcon } from "../icons/SmallXIcon";

type CallTypeSelectProps = {
  currentFilter: CallFilter | null;
  setQParams: Dispatch<SetStateAction<QParams>>;
};

export const CallTypeSelect: FC<CallTypeSelectProps> = ({
  currentFilter,
  setQParams,
}) => {
  const { ref, isVisible, setIsVisible } = useHandleClickOutside(false);

  return (
    <div className="flex items-center gap-3">
      <div
        role="button"
        ref={ref}
        onClick={() => setIsVisible(!isVisible)}
        className={`${currentFilter ? "text-accent" : "text-secondary"} relative inline-flex items-center gap-1 rounded-lg bg-transparent text-sm`}
      >
        {currentFilter ? currentFilter : "Все типы"}
        <div
          className={`${isVisible ? "" : "rotate-180"} transition-all duration-150`}
        >
          <ArrowUp
            className={`${isVisible ? "fill-[#002CFB]" : "fill-[#ADBFDF]"}`}
          />
        </div>
        {isVisible && (
          <div className="absolute left-0 top-[calc(100%+12px)] isolate z-10 min-w-[130px] rounded-lg bg-white shadow-dropdown">
            <button
              className="w-full px-3 py-[7px] text-left text-xs/[18px] text-muted transition-colors duration-150 hover:bg-hover focus-visible:bg-hover"
              onClick={() => {
                setQParams((prevState) => ({
                  ...prevState,
                  currentFilter: null,
                }));
                setIsVisible(false);
              }}
            >
              Все типы
            </button>
            <button
              className="w-full px-3 py-[7px] text-left text-xs/[18px] text-muted transition-colors duration-150 hover:bg-hover focus-visible:bg-hover"
              onClick={() => {
                setQParams((prevState) => ({
                  ...prevState,
                  currentFilter: "Входящие",
                }));

                setIsVisible(false);
              }}
            >
              Входящие
            </button>
            <button
              className="w-full px-3 py-[7px] text-left text-xs/[18px] text-muted transition-colors duration-150 hover:bg-hover focus-visible:bg-hover"
              onClick={() => {
                setQParams((prevState) => ({
                  ...prevState,
                  currentFilter: "Исходящие",
                }));
                setIsVisible(false);
              }}
            >
              Исходящие
            </button>
          </div>
        )}
      </div>
      {currentFilter && (
        <button
          onClick={() =>
            setQParams((prevState) => ({ ...prevState, currentFilter: null }))
          }
          className="relative inline-flex text-sm text-secondary"
        >
          <span>Сбросить фильтры</span>
          <span className="absolute -right-4 top-1/2 -translate-y-[calc(50%-1px)]">
            <SmallXIcon />
          </span>
        </button>
      )}
    </div>
  );
};
