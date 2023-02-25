import type { Variants } from "framer-motion";

export const variants: Variants = {
  hidden: {
    y: 25,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  },
  exit: {
    y: 25,
    opacity: 0
  }
};

export const item: Variants = {
  hidden: {
    opacity: 0,
    y: -25
  },
  visible: {
    opacity: 1,
    y: 0
  }
};
