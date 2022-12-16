"use client";
import type { ComponentPropsWithoutRef } from "react";
import { cva } from "cva";
import type { VariantProps } from "cva";

const styles = cva(
  "appearance-none outline-none border w-full px-4 py-1 focus:border-red-600 dark:focus:border-red-500 border-gray-400 dark:border-gray-700 bg-zinc-100 dark:bg-zinc-700",
  {
    variants: {
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        none: "rounded-none"
      }
    },
    defaultVariants: {
      radius: "md"
    }
  }
);

type InputProps = { label: string; wrapperClassName?: string } & VariantProps<typeof styles> &
  ComponentPropsWithoutRef<"input">;

export function Input({ label, className, radius, wrapperClassName, ...props }: InputProps) {
  return (
    <p className={wrapperClassName || "w-full"}>
      <label>{label}</label>
      <input {...props} className={styles({ className, radius })} />
    </p>
  );
}
