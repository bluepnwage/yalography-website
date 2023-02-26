import type { Variants } from "framer-motion";
export const variants: Variants = {
  enter: (direction: number) => ({
    x: innerWidth * direction,
    opacity: 0
  }),

  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: -innerWidth * direction,
    opacity: 0
  })
};
