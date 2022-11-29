import type { ComponentPropsWithoutRef } from "react";
import { cva } from "cva";
import type { VariantProps } from "cva";

const styles = cva("flex justify-center font-semibold rounded-full items-center px-3 py-1", {
  variants: {
    color: {
      red: "bg-red-200 text-red-600 dark:bg-red-500 dark:text-red-200 dark:bg-opacity-50",
      indigo: "bg-indigo-200 text-indigo-600 dark:bg-indigo-500 dark:text-indigo-200 dark:bg-opacity-50",
      yellow: "bg-yellow-200 text-yellow-600 dark:bg-yellow-500 dark:text-yellow-200 dark:bg-opacity-50",
      orange: "bg-orange-200 text-orange-600 dark:bg-orange-500 dark:text-orange-200 dark:bg-opacity-50",
      green: "bg-green-200 text-green-600 dark:bg-green-500 dark:text-green-200 dark:bg-opacity-50",
      violet: "bg-violet-200 text-violet-600 dark:bg-violet-500 dark:text-violet-200 dark:bg-opacity-50"
    }
  },
  defaultVariants: {
    color: "red"
  }
});

type BadgeProps = Omit<ComponentPropsWithoutRef<"div">, "color"> & VariantProps<typeof styles>;

export function Badge({ children, className, color }: BadgeProps) {
  return (
    <div className={styles({ className, color })}>
      <span>{children}</span>
    </div>
  );
}
