"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export function ScrollToTop() {
  const path = usePathname();
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  useEffect(() => {
    if (isFirstMount.current) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);
  return <></>;
}
