"use client";
import { Button } from "@aomdev/ui";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function CancelButton() {
  const { pending } = useFormStatus();
  return (
    <Button loading={pending} variant={"error"}>
      Cancel
    </Button>
  );
}
