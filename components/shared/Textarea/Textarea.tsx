"use client";
import { cva, cx } from "cva";
import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "cva";

const styles = cva(
  "appearance-none outline-none border px-4 w-full py-1 focus:border-red-600 dark:focus:border-red-500 border-gray-400 dark:border-gray-700 bg-zinc-100 dark:bg-zinc-700",
  {
    variants: {
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        none: "rounded-none"
      },
      resize: {
        false: "resize-none"
      }
    },
    defaultVariants: {
      radius: "md",
      resize: false
    }
  }
);

type PropTypes = ComponentPropsWithoutRef<"textarea"> &
  VariantProps<typeof styles> & { label: string; wrapperClassName?: string };

export function Textarea({ label, className, radius, resize, wrapperClassName, ...props }: PropTypes) {
  return (
    <p className={wrapperClassName || "w-full"}>
      <label>{label}</label>
      <textarea {...props} className={styles({ className, radius, resize })} />
    </p>
  );
}
