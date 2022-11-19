import { AnchorHTMLAttributes } from "react";

interface PropTypes extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function Anchor({ children, ...props }: PropTypes) {
  return (
    <a {...props} className="text-yellow-500">
      {children}
    </a>
  );
}
