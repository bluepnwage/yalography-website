import { cva, cx } from "cva";

import type { VariantProps } from "cva";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type CardProps<C extends ElementType> = {
  component?: C;
} & ComponentPropsWithoutRef<C>;

const styles = cva("dark:bg-zinc-800 relative bg-white p-4 duration-200 ease-out", {
  variants: {
    radius: {
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl"
    },
    glow: {
      true: "ring-red-600  dark:ring-red-500 ring-1"
    }
  },
  defaultVariants: {
    radius: "md"
  }
});

type PropTypes<C extends ElementType> = CardProps<C> & VariantProps<typeof styles>;

export function Card<C extends ElementType = "div">({
  glow,
  containerStyles,
  children,
  component,
  radius,
  className,
  ...props
}: PropTypes<C>) {
  const Component = component || "div";
  return (
    <>
      <Component {...props} className={styles({ className, radius, glow })}>
        {glow && (
          <div
            aria-hidden
            className="absolute top-0 left-0 w-full h-full -inset-2 blur-sm bg-red-600 dark:bg-red-500 -z-10 rounded-md "
          ></div>
        )}
        {children}
      </Component>
    </>
  );
}
