"use client";
import type { Images } from "@prisma/client";
import { useToggle } from "@lib/hooks/useToggle";
import { Image } from "@components/shared/Image";
import { useState } from "react";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("./Carousel").then(mod => mod.Carousel));

type PropTypes = {
  images: Images[];
};
export function Gallery({ images }: PropTypes) {
  const [dialog, toggle] = useToggle();
  const [lazy, lazyLoad] = useToggle();
  const [index, setIndex] = useState(0);
  const prevValue = usePrevious(index);

  const currentImage = images[index];

  const next = () => {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(prev => prev + 1);
    }
  };

  const onClick = (id: number) => {
    toggle.on();
    setIndex(id);
  };

  const prev = () => {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(prev => prev - 1);
    }
  };

  return (
    <>
      {lazy && (
        <Carousel
          direction={prevValue ? (index > prevValue ? 1 : -1) : 1}
          next={next}
          prev={prev}
          curr={currentImage}
          open={dialog}
          setOpen={toggle.set}
        />
      )}
      <div style={{ gridAutoFlow: "dense" }} className="grid grid-cols-2 gap-2 w-[90%]">
        {images.map((image, index) => {
          return (
            <Image
              onMouseEnter={!lazy ? lazyLoad.on : undefined}
              onClick={() => onClick(index)}
              key={image.id}
              width={image.width}
              height={image.height}
              src={image.url}
              alt={image.alt || ""}
              refMargin={"100px"}
              containerClass={`${
                image.width - image.height > 1 ? "col-span-2" : "lg:col-span-1 col-span-2 row-span-2"
              }`}
              className={`w-full h-full `}
            />
          );
        })}
      </div>
    </>
  );
}

function usePrevious(count: number) {
  const [prev, setPrev] = useState([null, count]);
  if (prev[1] !== count) {
    setPrev([prev[1], count]);
  }
  return prev[0];
}
