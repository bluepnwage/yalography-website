"use client";
import type { ComponentPropsWithoutRef } from "react";
import { cva } from "cva";
import type { VariantProps } from "cva";

const styles = cva("appearance-none outline-none border w-full px-4 py-1  bg-zinc-100 dark:bg-zinc-700", {
  variants: {
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      none: "rounded-none"
    },
    error: {
      true: "border-red-600 dark:border-red-500 focus:border-red-600 dark:focus:border-red-500 ",
      false: "border-gray-400 dark:border-gray-700 focus:border-emerald-600 dark:focus:border-emerald-500 "
    }
  },
  defaultVariants: {
    radius: "md",
    error: false
  }
});

type InputProps = { label: string; wrapperClassName?: string } & VariantProps<typeof styles> &
  ComponentPropsWithoutRef<"input">;

export function Input({ label, className, radius, wrapperClassName, error, ...props }: InputProps) {
  return (
    <p className={wrapperClassName || "w-full"}>
      <label htmlFor={props.id}>
        {label}
        {props.required && (
          <span aria-label="required" className="text-red-600 inline-block ml-1 dark:text-red-500">
            *
          </span>
        )}
      </label>
      <input
        {...props}
        aria-describedby={`${props.id}-validation`}
        className={styles({ className, radius, error })}
      />
      {error && (
        <span
          aria-live="assertive"
          id={`${props.id}-validation`}
          className="text-sm text-red-600 dark:text-red-500"
        >
          Please fill out this field.
        </span>
      )}
    </p>
  );
}
