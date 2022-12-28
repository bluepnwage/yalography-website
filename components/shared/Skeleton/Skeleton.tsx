import { cva } from "cva";

import type { VariantProps } from "cva";
import type { ComponentPropsWithoutRef } from "react";

const styles = cva("bg-red-600 grayscale animate-pulse", {
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
    radius: "xl"
  }
});

type PropTypes = VariantProps<typeof styles> & ComponentPropsWithoutRef<"div">;

export function Skeleton({ children, radius, className, ...props }: PropTypes) {
  return (
    <>
      <div {...props} className={styles({ radius, className })}>
        {children}
      </div>
    </>
  );
}

function SkeletonShimmer() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-zinc-400/40 dark:via-rose-100/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
  );
}

Skeleton.Shimmer = SkeletonShimmer;
