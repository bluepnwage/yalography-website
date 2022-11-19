import type { HTMLAttributes } from "react";

interface PropTypes extends HTMLAttributes<HTMLElement> {}

export function Section({ children, className, ...props }: PropTypes) {
  return (
    <section {...props} className={`flex flex-col items-center mb-48 ${className}`}>
      {children}
    </section>
  );
}
