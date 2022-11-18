import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  width?: string;
  gap?: string;
  rows?: string;
  cols?: string;
}
export function Grid({ children, width = "", gap = "", cols = "grid-cols-12", rows = "" }: PropTypes) {
  return <div className={`grid ${width} ${gap} ${cols} ${rows}`}>{children}</div>;
}
