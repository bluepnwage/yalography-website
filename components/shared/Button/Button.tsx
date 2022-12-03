"use client";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cva } from "cva";
import type { VariantProps } from "cva";
import Link from "next/link";

type PropTypes<C extends ElementType> = { component?: C } & ComponentPropsWithoutRef<C>;

const styles = cva("px-4 py-2 font-semibold rounded-md inline-block relative active:top-[2px]", {
  variants: {
    intent: {
      primary: "bg-red-600 text-gray-100",
      secondary: "bg-zinc-800 text-red-500",
      accept: "bg-emerald-600 text-gray-100",
      reject: "text-red-500 ring-1 ring-red-500",
      warn: "bg-yellow-600 text-gray-100"
    },
    fullWidth: {
      true: "w-full",
      false: "w-fit"
    },
    disabled: {
      true: "cursor-not-allowed grayscale"
    }
  },
  defaultVariants: {
    intent: "primary",
    fullWidth: false
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
        <Link {...buttonProps} href={buttonProps.href} className={styles({ fullWidth, intent, className, disabled })}>
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
