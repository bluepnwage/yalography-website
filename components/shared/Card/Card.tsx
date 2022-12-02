import { cva, cx } from "cva";

import type { VariantProps } from "cva";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type CardProps<C extends ElementType> = {
  component?: C;
  gradientBorder?: boolean;
  containerStyles?: string;
} & ComponentPropsWithoutRef<C>;

const styles = cva(
  "dark:bg-zinc-800 relative bg-white ring-black ring-1 ring-opacity-5 dark:ring-0 p-4 duration-200 ease-out",
  {
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
  }
);

type PropTypes<C extends ElementType> = CardProps<C> & VariantProps<typeof styles>;

export function Card<C extends ElementType = "div">({
  gradientBorder,
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
      {gradientBorder ? (
        <div className={cx("relative", containerStyles)}>
          <div
            aria-hidden
            className={cx("bg-gradient-to-r -inset-0.5 absolute opacity-75 rounded-md from-rose-500  to-red-600 blur")}
          ></div>
          <Component {...props} className={styles({ className, radius })}>
            {children}
          </Component>
        </div>
      ) : (
        <Component {...props} className={styles({ className, radius })}>
          {children}
        </Component>
      )}
    </>
  );
}
