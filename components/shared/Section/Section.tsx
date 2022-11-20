import type { HTMLAttributes } from "react";

interface PropTypes extends HTMLAttributes<HTMLElement> {
  margin?: string;
}

export function Section({ children, className, margin, ...props }: PropTypes) {
  return (
    <section {...props} className={`flex flex-col items-center ${margin || "mb-48"} ${className}`}>
      {children}
    </section>
  );
}
