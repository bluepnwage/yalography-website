import type { Variants } from "framer-motion";
export const variants: Variants = {
  enter: {
    x: 1000
    // opacity: 0
  },

  center: {
    zIndex: 1,
    x: 0
    // opacity: 1
  },
  exit: {
    zIndex: 0,
    x: -1000
    // opacity: 0
  }
};
