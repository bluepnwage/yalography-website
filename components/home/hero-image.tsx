"use client";
import Image from "next/image";
import villa from "@/public/slideshow/villa-lg.webp";
import { useScroll } from "framer-motion";
import { useRef } from "react";

type PropTypes = {
  children: React.ReactNode;
};

export function BackgroundImage({ children }: PropTypes) {
  return (
    <div
      className={`bg-black overflow-hidden mb-48  relative flex flex-col justify-center [height:calc(100vh-64px)]  
      border-b border-zinc-200  duration-200 ease-out dark:border-zinc-700`}
    >
      <Image src={villa} placeholder="blur" alt="" fill className="opacity-20 object-cover" />
      {children}
    </div>
  );
}
