import type { StaticImageData } from "next/image";
import { Variants, motion, AnimatePresence } from "framer-motion";

type PropTypes = {
  photos: StaticImageData[];
  children: React.ReactNode;
};

const container: Variants = {
  enter: {
    transition: {
      staggerChildren: 0.09
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.09
    }
  },

  exit: {
    transition: {
      staggerChildren: 0.09
    }
  }
};

const animate: Variants = {
  enter(y) {
    return {
      opacity: 0,
      filter: "blur(12px)",
      y,
      transition: {
        bounce: 1,
        duration: 0.4
      }
    };
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      bounce: 1,
      duration: 0.4
    }
  },
  exit(y) {
    return {
      opacity: 0,
      y: -y,
      filter: "blur(12px)",
      transition: {
        bounce: 1,
        duration: 0.4
      }
    };
  }
};

export function ServicesGallery({ photos, children }: PropTypes) {
  return (
    <AnimatePresence>
      <motion.div
        variants={container}
        initial="enter"
        animate="animate"
        exit={"exit"}
        key={photos[0].src}
        style={{ gridAutoRows: "350px" }}
        className="absolute top-0 left-0 w-full h-full grid grid-cols-12 gap-4"
      >
        <div className="col-span-4 flex flex-col justify-between gap-4 row-span-2">
          <figure className="basis-1/2 rounded-md relative overflow-hidden">
            <BlurImage y={350} image={photos[0]} />
          </figure>
          <figure className=" basis-1/2 rounded-md relative overflow-hidden">
            <BlurImage y={350} image={photos[1]} />
          </figure>
        </div>
        <div className="col-span-4 flex flex-col justify-between gap-4 row-span-2">
          <figure className="basis-1/3 rounded-md relative overflow-hidden">
            <BlurImage y={250} image={photos[2]} />
          </figure>
          {children}
          <figure className=" basis-1/3 rounded-md relative overflow-hidden">
            <BlurImage y={250} image={photos[3]} />
          </figure>
        </div>
        <div className="col-span-4 flex flex-col justify-between gap-4 row-span-2">
          <figure className=" basis-1/2 rounded-md overflow-hidden relative">
            <BlurImage y={350} image={photos[4]} />
          </figure>
          <figure className="relative overflow-hidden basis-1/2 rounded-md">
            <BlurImage y={350} image={photos[5]} />
          </figure>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function BlurImage(props: { image: StaticImageData; y: number }) {
  return (
    <>
      <motion.img
        custom={props.y}
        variants={animate}
        key={props.image.src}
        src={props.image.src}
        alt=""
        className="absolute rounded-md  "
      />
    </>
  );
}
