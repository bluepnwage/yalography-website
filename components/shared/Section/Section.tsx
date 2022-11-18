import type { ReactNode, HTMLAttributes } from "react";

interface PropTypes extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({ children, ...props }: PropTypes) {
  return (
    <section {...props} className={`flex flex-col items-center mb-48`}>
      {children}
    </section>
  );
}
