import { Dialog } from "@aomdev/ui";
import type { DialogProps } from "@aomdev/ui";

export function DeleteDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <Dialog.Content className="w-1/4">
        <Dialog.Title>Are you sure?</Dialog.Title>
        <p className="mb-4 mt-2">
          This action cannot be undone. The client will be notified once you proceed.
        </p>
        {props.children}
      </Dialog.Content>
    </Dialog>
  );
}
