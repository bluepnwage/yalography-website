"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

const images = ["adm-lg.webp", "class-boutique-thumb-lg.webp", "villa-lg.webp", "dress-lg.webp"];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

export const Slideshow = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const timerId = useRef<NodeJS.Timer | undefined>();
  useEffect(() => {
    if (!timerId.current) {
      timerId.current = setInterval(() => {
        paginate();
      }, 2500);
    }
    return () => {
      clearInterval(timerId.current);
      timerId.current = undefined;
    };
  }, [timerId.current]);
  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = useCallback(() => {
    setPage(prev => [prev[0] + 1, 1]);
  }, []);

  const pause = () => {
    clearInterval(timerId.current);
    timerId.current = undefined;
  };

  const resume = () => {
    if (timerId.current) clearInterval(timerId.current);
    timerId.current = setInterval(() => {
      paginate();
    }, 2500);
  };

  return (
    <div className="w-3/5 overflow-hidden relative aspect-video">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          alt={""}
          className="h-full w-full absolute object-cover"
          src={`/slideshow/${images[imageIndex]}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          onMouseEnter={pause}
          onMouseLeave={resume}
        />
      </AnimatePresence>
    </div>
  );
};
