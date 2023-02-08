"use client";
import type { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.css";
import { cx } from "cva";

type PropTypes = ComponentPropsWithoutRef<"input"> & {
  showBg?: boolean;
};

export function Checkbox({ showBg, ...props }: PropTypes) {
  return (
    <input
      {...props}
      data-bg={showBg}
      type="checkbox"
      className={cx(
        styles.checkbox,
        `checked:border-transparent m-10 before:bg-gray-300 before:dark:bg-zinc-700  
        checked:after:bg-red-600 checked:after:dark:bg-red-500 after:border after:border-gray-400
        after:dark:border-gray-700`
      )}
    />
  );
}
