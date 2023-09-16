import { Dialog } from "@aomdev/ui";
import type { DialogProps } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";

export function DeleteDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <Dialog.Content className="w-1/4">
        <div className="flex justify-between items-center">
          <Dialog.Title>Delete booking</Dialog.Title>
          <Dialog.Close>
            <IconX size={16} />
          </Dialog.Close>
        </div>
        <p className="mb-4 mt-2">
          This action cannot be undone. The client will be notified once you proceed.
        </p>
        {props.children}
      </Dialog.Content>
    </Dialog>
  );
}
