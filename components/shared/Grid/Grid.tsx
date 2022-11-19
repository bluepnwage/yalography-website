import type { HTMLAttributes } from "react";

interface PropTypes extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  gap?: string;
  rows?: string;
  cols?: string;
}
export function Grid({ children, width = "", gap = "", cols = "grid-cols-12", rows = "", className }: PropTypes) {
  return <div className={`grid ${width} ${gap} grid-cols-6 lg:${cols} ${rows} ${className}`}>{children}</div>;
}
