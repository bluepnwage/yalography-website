import type { HTMLAttributes } from "react";

interface PropTypes extends Omit<HTMLAttributes<HTMLHeadingElement>, "color"> {
  color?: "text-red-500" | "text-gray-100";
  order?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Title({ order, color, children, className, ...props }: PropTypes) {
  const Component = order || "h1";
  return (
    <Component {...props} className={`font-bold ${className} ${color}`}>
      {children}
    </Component>
  );
}
