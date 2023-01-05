"use client";
import type { ComponentPropsWithoutRef } from "react";
import { cva, VariantProps } from "cva";

const styles = cva("flex items-center justify-center active:top-[2px]", {
  variants: {
    color: {
      red: "bg-red-200 text-red-600 dark:bg-red-500 dark:text-red-200 dark:bg-opacity-40",
      indigo: "bg-indigo-200 text-indigo-600 dark:bg-indigo-500 dark:text-indigo-200 dark:bg-opacity-40",
      yellow: "bg-yellow-200 text-yellow-600 dark:bg-yellow-500 dark:text-yellow-200 dark:bg-opacity-40",
      orange: "bg-orange-200 text-orange-600 dark:bg-orange-500 dark:text-orange-200 dark:bg-opacity-40",
      green: "bg-green-200 text-green-600 dark:bg-green-500 dark:text-green-200 dark:bg-opacity-40",
      violet: "bg-violet-200 text-violet-600 dark:bg-violet-500 dark:text-violet-200 dark:bg-opacity-40",
      emerald: "bg-emerald-200 text-emerald-600 dark:bg-emerald-500 dark:text-emerald-200 dark:bg-opacity-40"
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full"
    },
    disabled: {
      false: "relative ",
      true: "static grayscale"
    }
  },
  defaultVariants: {
    color: "red",
    radius: "md",
    disabled: false
  }
});

type PropTypes = ComponentPropsWithoutRef<"button"> & VariantProps<typeof styles>;

export function ActionIcon({ className, radius, color, children, disabled, ...props }: PropTypes) {
  return (
    <button {...props} disabled={disabled} className={styles({ className, radius, color, disabled })}>
      {children}
    </button>
  );
}
