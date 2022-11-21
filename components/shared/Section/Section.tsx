import type { ComponentPropsWithoutRef } from "react";
import { FlexContainer } from "../FlexContainer";

import { cva } from "cva";
import type { VariantProps } from "cva";

const styles = cva("items-center", {
  variants: {
    margin: {
      true: "mb-20 lg:mb-48",
      false: "mb-0 lg:mb-0"
    }
  },
  defaultVariants: {
    margin: true
  }
});

type SectionProps = ComponentPropsWithoutRef<"section"> & VariantProps<typeof styles>;

export function Section({ children, className, margin, ...props }: SectionProps) {
  return (
    <FlexContainer direction={"column"} component={"section"} {...props} className={styles({ margin, className })}>
      {children}
    </FlexContainer>
  );
}
