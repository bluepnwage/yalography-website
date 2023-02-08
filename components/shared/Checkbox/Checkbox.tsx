"use client";
import type { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.css";
import { cx, cva } from "cva";
import type { VariantProps } from "cva";

const style = cva(
  `checked:border-transparent before:bg-gray-300 before:dark:bg-zinc-700
 after:dark:border-gray-700 after:border after:border-gray-400`,
  {
    variants: {
      color: {
        red: "checked:after:bg-red-600 checked:after:dark:bg-red-500",
        emerald: "checked:after:bg-emerald-600 checked:after:dark:bg-emerald-500"
      }
    },
    defaultVariants: {
      color: "red"
    }
  }
);

type PropTypes = ComponentPropsWithoutRef<"input"> & {
  showBg?: boolean;
} & VariantProps<typeof style>;

export function Checkbox({ showBg, color, ...props }: PropTypes) {
  return (
    <input
      {...props}
      data-bg={showBg}
      type="checkbox"
      className={style({
        color,
        className: cx(
          styles.checkbox,
          `checked:border-transparent before:bg-gray-300 before:dark:bg-zinc-700  
        checked:after:bg-red-600 checked:after:dark:bg-red-500 after:border after:border-gray-400
        after:dark:border-gray-700`
        )
      })}
    />
  );
}
