import type { HTMLAttributes } from "react";

interface PropTypes extends HTMLAttributes<HTMLDivElement> {
  color: "red" | "green" | "indigo" | "yellow" | "orange";
}

export function Badge({ children, className }: PropTypes) {
  return (
    <div
      className={`rounded-full px-3 py-1 text-sm flex justify-center items-center bg-indigo-600 bg-opacity-50 text-indigo-300 font-semibold ${className}`}
    >
      <span>{children}</span>
    </div>
  );
}
