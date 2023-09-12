"use client";
import { useInView } from "framer-motion";
import { useRef } from "react";

import type { ImageProps } from "next/image";
import { BlurImage } from "@/components/blur-image";

type PropTypes = ImageProps & { containerClass: string; refMargin?: string };

export function Image({ containerClass, refMargin, ...props }: PropTypes) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: refMargin || "-100px" });
  return (
    <figure ref={ref} className={containerClass}>
      {inView && <BlurImage {...props} />}
    </figure>
  );
}
