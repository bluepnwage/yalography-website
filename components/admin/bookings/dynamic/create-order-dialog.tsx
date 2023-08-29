"use client";
import { Dialog, DialogProps } from "@aomdev/ui";

export function CreateOrderDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <Dialog.Content>{props.children}</Dialog.Content>
    </Dialog>
  );
}
