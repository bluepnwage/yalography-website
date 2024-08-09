"use client";
import { Button } from "@aomdev/ui";
import { useFormStatus } from "react-dom";

export function CancelButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      loading={pending}
      variant={"error"}
    >
      Cancel
    </Button>
  );
}
