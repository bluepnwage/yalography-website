"use client";
import type { Images } from "@prisma/client";
import { useToggle } from "@lib/hooks/useToggle";
import { Image } from "@components/shared/Image";
// import { Carousel } from "./Carousel";
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
      {lazy && <Carousel next={next} prev={prev} curr={currentImage} open={dialog} setOpen={toggle.set} />}
      <div className={styles.grid}>
        {images.map((image, index) => {
          const className =
            image.width / image.height > 1
              ? "lg:col-span-2"
              : image.width / image.height < 1
              ? "row-span-2"
              : "";
          const objectPosition = className === "lg:col-span-2" ? `center 20%` : undefined;
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
              containerClass={`w-full h-full cursor-pointer overflow-hidden ${className}`}
              className="w-full h-full object-cover"
            />
          );
        })}
      </div>
    </>
  );
}
