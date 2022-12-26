import { useState } from "react";

export function useToggle(): [boolean, typeof toggle] {
  const [state, setState] = useState(false);
  const toggle = {
    on: () => {
      setState(true);
    },
    off: () => {
      setState(false);
    },
    toggle: () => {
      setState((prev) => !prev);
    },
    set: (value: boolean) => {
      setState(value);
    }
  } as const;
  return [state, toggle];
}
