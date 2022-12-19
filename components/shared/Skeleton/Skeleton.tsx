import { cva } from "cva";

import type { VariantProps } from "cva";
import type { ComponentPropsWithoutRef } from "react";

const styles = cva("animate-pulse bg-red-600", {
  variants: {
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full"
    }
  },
  defaultVariants: {
    radius: "md"
  }
});

type PropTypes = VariantProps<typeof styles> & ComponentPropsWithoutRef<"div">;

export function Skeleton({ children, radius, className, ...props }: PropTypes) {
  return (
    <div {...props} className={styles({ radius, className })}>
      {children}
    </div>
  );
}
