import { useEffect, useRef, RefObject } from "react";

type EventHandler = (event: MouseEvent) => void;

const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: EventHandler,
) => {
  const savedHandler = useRef<EventHandler>(handler);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        savedHandler.current(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
};

export default useOnClickOutside;
