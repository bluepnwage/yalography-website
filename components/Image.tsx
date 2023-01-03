"use client";
import NextImage from "next/image";
import { useToggle } from "@lib/hooks/useToggle";
import type { ImageProps } from "next/image";

type PropTypes = ImageProps;

export function Image({ className, ...props }: PropTypes) {
  const [loading, toggle] = useToggle(true);
  return (
    <>
      <NextImage
        {...props}
        className={`${
          loading ? "h-full w-full blur-sm duration-200 bg-red-500 grayscale animate-pulse" : "blur-0"
        } ${className}`}
        onLoadingComplete={toggle.off}
      />
    </>
  );
}
