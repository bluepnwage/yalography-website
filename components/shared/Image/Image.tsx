"use client";
import { Photo } from "@/lib/icons";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { useRef } from "react";

import type { ImageProps } from "next/image";

const ImageWrapper = dynamic(() => import("./ImageWrapper"), { loading: () => <ImageFallback /> });

type PropTypes = ImageProps & { containerClass: string; refMargin?: string };

export function Image({ containerClass, refMargin, ...props }: PropTypes) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: refMargin || "-100px" });
  return (
    <figure ref={ref} className={containerClass}>
      {!inView && <ImageFallback />}
      {inView && <ImageWrapper {...props} />}
    </figure>
  );
}

function ImageFallback() {
  return (
    <div className="w-full relative animate-pulse bg-red-400 dark:bg-red-900 grayscale h-full flex items-center justify-center">
      <Photo size={48} className="dark:stroke-zinc-500 stroke-zinc-300" />
    </div>
  );
}
