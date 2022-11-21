import { AnchorHTMLAttributes } from "react";
import Link from "next/link";

interface PropTypes extends AnchorHTMLAttributes<HTMLAnchorElement> {
  externalLink?: boolean;
}

export function Anchor({ children, className, externalLink, href, ...props }: PropTypes) {
  const Component = externalLink ? "a" : Link;
  return (
    <>
      <Component className={`text-yellow-500 ${className}`} href={`${href}`} {...props}>
        {children}
      </Component>
    </>
  );
}
