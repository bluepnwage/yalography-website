"use client";
import NextImage from "next/image";
import type { ImageProps } from "next/image";
import { useToggle } from "@lib/hooks/useToggle";

export default function ImageWrapper({ ...props }: ImageProps) {
  const [loading, toggle] = useToggle(true);
  return (
    <NextImage
      {...props}
      className={`duration-700 ease-in-out ${
        loading ? "blur-md grayscale  bg-red-500 " : "blur-0 grayscale-0"
      } ${props.className}`}
      onLoadingComplete={toggle.off}
    />
  );
}
