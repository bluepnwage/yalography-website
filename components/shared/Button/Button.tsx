import type { ComponentPropsWithoutRef } from "react";
import { cva } from "cva";
import type { VariantProps } from "cva";

const buttonStyles = cva("px-4 py-2 font-semibold rounded-md", {
  variants: {
    intent: {
      primary: "bg-red-600 text-gray-100",
      secondary: "bg-zinc-800 text-red-500"
    },
    fullWidth: {
      true: "w-full",
      false: "w-fit"
    }
  },
  defaultVariants: {
    intent: "primary",
    fullWidth: false
  }
});

type ButtonProps = ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonStyles>;

export function Button({ intent, children, fullWidth, className, ...buttonProps }: ButtonProps) {
  return (
    <button {...buttonProps} className={buttonStyles({ fullWidth, intent, className })}>
      {children}
    </button>
  );
}
