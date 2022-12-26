"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function ScrollToTop() {
  const path = usePathname();
  const [isFirstMount, setFirstMount] = useState(true);

  useEffect(() => {
    setFirstMount(false);
  }, []);

  useEffect(() => {
    if (isFirstMount) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);
  return <></>;
}
