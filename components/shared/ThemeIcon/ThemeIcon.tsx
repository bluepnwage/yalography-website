import { ComponentPropsWithoutRef } from "react";
import { cva } from "cva";
import type { VariantProps } from "cva";

const styles = cva("flex items-center justify-center", {
  variants: {
    gradient: {
      true: "bg-gradient-to-tr from-rose-500 to-red-600",
      false: "bg-zinc-800"
    },
    size: {
      sm: "h-12 w-12",
      md: "h-16 w-16",
      lg: "h-20 w-20",
      xl: "h-24 w-24"
    },
    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full"
    }
  },
  defaultVariants: {
    gradient: true,
    size: "md",
    rounded: "full"
  }
});

type ThemeIconProps = ComponentPropsWithoutRef<"div"> & VariantProps<typeof styles>;

export function ThemeIcon({ className, size, gradient, children, ...props }: ThemeIconProps) {
  return (
    <div {...props} className={styles({ className, gradient, size })}>
      {children}
    </div>
  );
}
