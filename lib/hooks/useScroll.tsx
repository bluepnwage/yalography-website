"use client";
import { useRef, useEffect } from "react";

export function useScroll<T extends HTMLElement>(page: number) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ inline: "start" });
  }, [page]);
  return ref;
}
