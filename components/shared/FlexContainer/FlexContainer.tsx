import { cva } from "cva";
import type { VariantProps } from "cva";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import { GAP_STYLES } from "@util/gap";

type FlexContainerProps<C extends ElementType> = {
  component?: C;
} & ComponentPropsWithoutRef<C>;

const styles = cva("flex flex-col", {
  variants: {
    direction: {
      row: "lg:flex-row",
      column: "lg:flex-column"
    },
    gap: {
      ...GAP_STYLES
    }
  },
  defaultVariants: {
    direction: "row",
    gap: "sm"
  }
});

type PropTypes<C extends ElementType> = FlexContainerProps<C> & VariantProps<typeof styles>;

export function FlexContainer<C extends ElementType = "div">({
  component,
  direction,
  gap,
  children,
  className,
  ...props
}: PropTypes<C>) {
  const FlexComponent = component || "div";
  return (
    <FlexComponent className={styles({ direction, gap, className })} {...props}>
      {children}
    </FlexComponent>
  );
}
