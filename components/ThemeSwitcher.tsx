"use client";
import { useState } from "react";
import { cx } from "cva";
export function ThemeSwitcher() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const onToggle = () => {
    const html = document.documentElement;
    if (mode === "dark") {
      html.className = "font-sans light-mode";
      setMode("light");
    } else {
      html.className = "font-sans dark dark-mode";
      setMode("dark");
    }
  };
  return (
    <button
      aria-label={mode === "dark" ? "Toggle light mode" : "Toggle dark mode"}
      onClick={onToggle}
      className={cx(
        `h-9 w-9 p-1 relative items-center flex justify-center rounded-md font-semibold border text-center active:top-[2px]`,
        mode === "dark" ? "border-yellow-500" : "border-gray-900"
      )}
    >
      {mode === "dark" ? <Sun /> : <MoonStars />}
    </button>
  );
}

function Sun() {
  return (
    <svg height={16} width={16} className={"fill-yellow-500"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
      </g>
    </svg>
  );
}

function MoonStars() {
  return (
    <svg height={16} width={16} className={"stroke-gray-900"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z" />
        <path d="M17 4a2 2 0 0 0 2 2 2 2 0 0 0-2 2 2 2 0 0 0-2-2 2 2 0 0 0 2-2" />
        <path d="M19 11h2m-1-1v2" />
      </g>
    </svg>
  );
}
