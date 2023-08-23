"use client";
import { Dialog } from "@/components/shared/Dialog";
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
  direction: number;
};

export function Carousel({ open, setOpen, curr, next, prev, direction }: PropTypes) {
  const width = curr.width > curr.height ? innerWidth / 1.2 : "auto";
  const height = curr.height > curr.width ? innerHeight / 1.2 : "auto";
  return (
    <Dialog carousel title="" open={open} onOpenChange={setOpen}>
      <button
        aria-label="Previous image"
        className={`fixed top-2/4 left-5 -translate-y-2/4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-10 h-10 text-red-500`}
        onClick={prev}
      >
        {"<"}
      </button>
      <button
        aria-label="Next image"
        className={`fixed top-2/4 right-5 -translate-y-2/4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-10 h-10 text-red-500`}
        onClick={next}
      >
        {">"}
      </button>
      <div className="w-full h-full flex justify-center items-center">
        <div
          style={{ width, height, aspectRatio: curr.width > curr.height ? "16/9" : "9/16" }}
          className=" relative "
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={curr.id}
              custom={direction}
              variants={variants}
              initial="enter"
              exit="exit"
              animate={"center"}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30, duration: 0.4 },
                opacity: { duration: 0.2 }
              }}
              src={curr.url}
              className="absolute w-full   h-full"
            />
          </AnimatePresence>
        </div>
      </div>
    </Dialog>
  );
}
