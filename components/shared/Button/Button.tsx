"use client";
import Link from "next/link";
import { cva } from "cva";

import type { ComponentPropsWithoutRef, ElementType } from "react";
import type { VariantProps } from "cva";

type PropTypes<C extends ElementType> = { component?: C } & ComponentPropsWithoutRef<C>;

const styles = cva("px-4 py-2 font-semibold rounded-md inline-block active:top-[2px]", {
  variants: {
    intent: {
      primary: "bg-red-600 text-white",
      secondary: "bg-zinc-200 text-red-600 dark:bg-zinc-800 dark:text-red-500",
      accept: "bg-emerald-600 text-white",
      reject: "dark:text-red-500 text-red-600 ring-red-600 ring-1 dark:ring-red-500",
      warn: "bg-yellow-600 text-white"
    },
    fullWidth: {
      true: "w-full",
      false: "w-fit"
    },
    disabled: {
      true: "cursor-not-allowed grayscale static",
      false: "relative"
    }
  },
  defaultVariants: {
    intent: "primary",
    fullWidth: false,
    disabled: false
  }
});

type ButtonProps<C extends ElementType> = PropTypes<C> & VariantProps<typeof styles>;

export function Button<C extends ElementType = "button">({
  intent,
  children,
  fullWidth,
  className,
  component,
  disabled,
  ...buttonProps
}: ButtonProps<C>) {
  return (
    <>
      {component === "a" ? (
        <Link
          {...buttonProps}
          href={buttonProps.href}
          className={styles({ fullWidth, intent, className, disabled })}
        >
          {children}
        </Link>
      ) : (
        <button {...buttonProps} className={styles({ fullWidth, intent, className, disabled })}>
          {children}
        </button>
      )}
    </>
  );
}
