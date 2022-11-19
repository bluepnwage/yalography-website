import { AnchorHTMLAttributes } from "react";

interface PropTypes extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function Anchor({ children, className, ...props }: PropTypes) {
  return (
    <a {...props} className={`text-yellow-500 ${className}`}>
      {children}
    </a>
  );
}
