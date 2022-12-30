"use client";
import { cva } from "cva";
import tableStyles from "./styles.module.css";

import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "cva";

const styles = cva(
  `bg-white w-full dark:bg-zinc-900 rounded-md text-center
 overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-700`,
  {
    variants: {
      striped: {
        true: tableStyles.striped
      }
    }
  }
);

type TableProps = ComponentPropsWithoutRef<"table"> & VariantProps<typeof styles>;

export function Table({ children, className, striped, ...props }: TableProps) {
  return (
    <table {...props} className={styles({ className, striped })}>
      {children}
    </table>
  );
}
