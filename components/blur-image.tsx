"use client";
import { useState } from "react";
import type { ImageProps } from "next/image";
import Image from "next/image";
import { cx } from "cva";

export function BlurImage(props: ImageProps) {
  const [isComplete, setComplete] = useState(false);
  return (
    <Image
      {...props}
      onLoadingComplete={() => setComplete(true)}
      className={cx(
        props.className,
        !isComplete ? "blur-lg grayscale" : "grayscale-0 blur-0",
        "duration-500 ease-out"
      )}
    />
  );
}
