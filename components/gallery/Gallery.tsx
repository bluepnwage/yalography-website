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
      <div className={styles.grid}>
        {images.map((image, index) => {
          const className =
            image.width / image.height > 1
              ? "col-span-full lg:col-span-1 row-span-2"
              : image.width / image.height < 1
              ? "row-span-2"
              : "";
          const objectPosition =
            className === "col-span-full lg:col-span-1 row-span-2" ? `center 20%` : undefined;
          return (
            <Image
              onMouseEnter={!lazy ? lazyLoad.on : undefined}
              onClick={() => onClick(index)}
              key={image.id}
              width={image.width}
              height={image.height}
              style={{ objectPosition }}
              src={image.url}
              alt={image.alt || ""}
              refMargin={"100px"}
              containerClass={`w-full cursor-pointer overflow-hidden ${className}`}
              className={`w-full h-full ${styles.img} object-cover`}
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
