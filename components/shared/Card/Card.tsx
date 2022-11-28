import { cva } from "cva";

import type { VariantProps } from "cva";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type CardProps<C extends ElementType> = { component?: C } & ComponentPropsWithoutRef<C>;

const styles = cva("dark:bg-zinc-800 bg-white ring-black ring-1 ring-opacity-5 dark:ring-0 p-4 duration-200 ease-out", {
  variants: {
    radius: {
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl"
    }
  },
  defaultVariants: {
    radius: "md"
  }
});

type PropTypes<C extends ElementType> = CardProps<C> & VariantProps<typeof styles>;

export function Card<C extends ElementType = "div">({
  children,
  component,
  radius,
  className,
  ...props
}: PropTypes<C>) {
  const Component = component || "div";
  return (
    <Component {...props} className={styles({ className, radius })}>
      {children}
    </Component>
  );
}
