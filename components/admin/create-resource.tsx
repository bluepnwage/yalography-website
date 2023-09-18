"use client";
import { Button } from "@aomdev/ui";
import { useCommand } from "./command-provider";
import { IconPlus } from "@tabler/icons-react";

type PropTypes = {
  payload: "project" | "bookings" | "task" | "photo";
  children: React.ReactNode;
};

export function CreateResource({ children, payload }: PropTypes) {
  const { dispatch } = useCommand();
  return (
    <>
      <Button size={"sm"} onClick={() => dispatch({ type: "dialog", payload })}>
        <IconPlus size={16} className="inline-block mr-1" />
        {children}
      </Button>
    </>
  );
}
