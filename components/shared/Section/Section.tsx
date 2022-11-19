import type { ReactNode, HTMLAttributes } from "react";

interface PropTypes extends HTMLAttributes<HTMLElement> {
  bg?: string;
}

export function Section({ bg = "", children, ...props }: PropTypes) {
  return (
    <section {...props} className={`flex flex-col items-center mb-48 ${bg}`}>
      {children}
    </section>
  );
}
