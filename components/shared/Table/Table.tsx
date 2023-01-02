"use client";
import { cva } from "cva";
import tableStyles from "./styles.module.css";

import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "cva";

const styles = cva(
  `bg-white w-full dark:bg-zinc-900 text-center
 overflow-hidden  ring-zinc-200 dark:ring-zinc-700`,
  {
    variants: {
      striped: {
        true: tableStyles.striped
      },
      ring: {
        true: "ring-1",
        false: "ring-0"
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        none: "rounded-none"
      }
    },
    defaultVariants: {
      ring: true,
      radius: "md"
    }
  }
);

type TableProps = ComponentPropsWithoutRef<"table"> & VariantProps<typeof styles>;

export function Table({ children, className, striped, ring, radius, ...props }: TableProps) {
  return (
    <table {...props} className={styles({ className, striped, ring, radius })}>
      {children}
    </table>
  );
}
