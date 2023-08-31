"use client";
import { Dialog, DialogProps } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";

export function CreateOrderDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <Dialog.Content className="w-1/4">
        <div className="flex justify-between items-center mb-6">
          <Dialog.Title>Complete booking</Dialog.Title>
          <Dialog.Close>
            <IconX size={"75%"} />
          </Dialog.Close>
        </div>
        {props.children}
      </Dialog.Content>
    </Dialog>
  );
}
