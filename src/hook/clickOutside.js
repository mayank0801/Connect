import { useEffect } from "react";

export const useClickOutside = (ref, setState) => {
  useEffect(() => {
    const closeOptionsModal = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setState(false);
      }
    };
    document.addEventListener("mousedown", closeOptionsModal);

    return () => document.removeEventListener("mousedown", closeOptionsModal);
  }, [setState, ref]);
};