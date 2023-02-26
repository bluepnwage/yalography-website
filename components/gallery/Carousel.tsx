"use client";
import { Dialog } from "@components/shared/Dialog";
import { motion } from "framer-motion";
import { Images } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { variants } from "./animation";

type PropTypes = {
  open: boolean;
  setOpen: (value: boolean) => void;
  curr: Images;
  next: () => void;
  prev: () => void;
};

export function Carousel({ open, setOpen, curr, next, prev }: PropTypes) {
  // const width = curr.width > curr.height ? innerWidth / 1.2 : "auto";
  // const height = curr.height > curr.width ? innerHeight / 1.2 : "auto";
  return (
    <Dialog carousel title="" open={open} onOpenChange={setOpen}>
      <button
        className={`fixed top-2/4 left-5 -translate-y-2/4 rounded-full w-10 h-10 text-red-500`}
        onClick={prev}
      >
        -
      </button>
      <button
        className={`fixed top-2/4 right-5 -translate-y-2/4 rounded-full w-6 h-6 text-red-500`}
        onClick={next}
      >
        +
      </button>
      <div className="w-full h-full relative ">
        <AnimatePresence initial={false}>
          <motion.img
            key={curr.id}
            variants={variants}
            initial="enter"
            exit="exit"
            animate={"center"}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              duration: 0.3
            }}
            src={curr.url}
            className="absolute w-full h-full"
          />
        </AnimatePresence>
      </div>
    </Dialog>
  );
}
