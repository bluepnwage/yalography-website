"use client";
import { Button } from "@aomdev/ui";
import { useCommand } from "@/components/admin/command-provider";
import { IconPlus } from "@tabler/icons-react";

export function AddImages() {
  const { dispatch } = useCommand();
  return (
    <Button size={"sm"} onClick={() => dispatch({ type: "photo", payload: true })}>
      <IconPlus size={16} className="mr-1 inline-block" />
      Add images
    </Button>
  );
}
