"use client";
import type { ComponentPropsWithoutRef } from "react";
import { cva } from "cva";
import type { VariantProps } from "cva";

const styles = cva(
  "border appearance-none outline-none px-4 py-1 focus:border-red-500 border-gray-300 dark:border-gray-600 bg-zinc-600",
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

type InputProps = { label: string } & VariantProps<typeof styles> & ComponentPropsWithoutRef<"input">;

export function Input({ label, className, radius, ...props }: InputProps) {
  return (
    <p>
      <label>{label}</label>
      <input {...props} className={styles({ className, radius })} />
    </p>
  );
}
