import type { ComponentPropsWithoutRef } from "react";
import { cva } from "cva";
import type { VariantProps } from "cva";
import { GAP_STYLES } from "@util/gap";

const styles = cva("grid grid-cols-6 ", {
  variants: {
    lg: {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
      6: "lg:grid-cols-6",
      7: "lg:grid-cols-7",
      8: "lg:grid-cols-8",
      9: "lg:grid-cols-9",
      10: "lg:grid-cols-10",
      11: "lg:grid-cols-11",
      12: "lg:grid-cols-12"
    },
    gap: {
      ...GAP_STYLES
    },
    fullWidth: {
      false: "w-11/12",
      true: "w-full"
    }
  },
  defaultVariants: {
    lg: 12,
    gap: "md",
    fullWidth: false
  }
});

type GridProps = ComponentPropsWithoutRef<"div"> & VariantProps<typeof styles>;

export function Grid({ children, gap, lg, className, fullWidth }: GridProps) {
  return <div className={styles({ gap, lg, fullWidth, className })}>{children}</div>;
}
