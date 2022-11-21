import { cva } from "cva";

import type { VariantProps } from "cva";
import type { HTMLAttributes } from "react";

const styles = cva("font-bold ", {
  variants: {
    order: {
      h1: "text-4xl lg:text-6xl",
      h2: "text-3xl lg:text-4xl",
      h3: "text-2xl lg:text-3xl",
      h4: "text-xl lg:text-2xl",
      h5: "text-xl",
      h6: "text-lg"
    },
    color: {
      red: "text-red-500",
      gray: "text-gray-100"
    },
    size: {
      sm: "text-sm lg:text-sm",
      md: "text-base lg:text-base",
      lg: "text-lg lg:text-lg",
      xl: "text-xl lg:text-xl"
    }
  },
  defaultVariants: {
    color: "gray",
    order: "h1"
  }
});

type TitleProps = Omit<HTMLAttributes<HTMLHeadingElement>, "color"> & VariantProps<typeof styles>;

export function Title({ order, color, children, className, size, ...props }: TitleProps) {
  const Component = order || "h1";
  return (
    <Component {...props} className={styles({ color, order, className, size })}>
      {children}
    </Component>
  );
}
