"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@aomdev/ui";
import type { ButtonProps } from "@aomdev/ui";
import { IconLoader } from "@tabler/icons-react";
import { cx } from "cva";

export function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      {...props}
      className={cx("group relative flex items-center justify-center", props.className)}
    >
      <span className="group-disabled:opacity-0">{props.children}</span>
      <span className="group-disabled:opacity-100 opacity-0 absolute animate-spin">
        <IconLoader size={16} />
      </span>
    </Button>
  );
}
