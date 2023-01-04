"use client";
import type { ImageProps } from "next/image";
import { useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const ImageWrapper = dynamic(() => import("./ImageWrapper"), { loading: () => <ImageFallback /> });

type PropTypes = ImageProps & { containerClass: string };

export function Image({ containerClass, ...props }: PropTypes) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <figure ref={ref} className={containerClass}>
      {!inView && <ImageFallback />}
      {inView && <ImageWrapper {...props} />}
    </figure>
  );
}

function ImageFallback() {
  return <div className="w-full animate-pulse h-full grayscale bg-red-500 blur-md"></div>;
}
