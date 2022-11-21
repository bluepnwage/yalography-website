import type { ComponentPropsWithoutRef } from "react";
import { cva } from "cva";
import type { VariantProps } from "cva";

const styles = cva("flex justify-center font-semibold rounded-full items-center px-3 py-1", {
  variants: {
    color: {
      red: "bg-red-500 text-red-200 bg-opacity-50",
      indigo: "bg-indigo-500 text-indigo-200 bg-opacity-50",
      yellow: "bg-yellow-500 text-yellow-200 bg-opacity-50",
      orange: "bg-orange-500 text-orange-200 bg-opacity-50",
      green: "bg-green-500 text-green-200 bg-opacity-50",
      violet: "bg-violet-500 text-violet-200 bg-opacity-50"
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
