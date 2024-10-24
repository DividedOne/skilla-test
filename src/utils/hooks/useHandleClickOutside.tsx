﻿import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type TypeOut = {
  ref: any;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

export const useHandleClickOutside = (initialVisibility: boolean): TypeOut => {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
};
