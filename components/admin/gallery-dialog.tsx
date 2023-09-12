"use client";
//Components
import { Dialog } from "@aomdev/ui";
import { Dropzone } from "./gallery-dropzone";

import type { DialogProps } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";

type PropTypes = {
  dialogProps: DialogProps;
};

export function GalleryDialog({ dialogProps }: PropTypes) {
  return (
    <>
      <Dialog {...dialogProps}>
        <Dialog.Content className="w-1/4">
          <div className="flex justify-between mb-6 items-center">
            <Dialog.Title>Add gallery images</Dialog.Title>
            <Dialog.Close>
              <IconX size={"75%"} />
            </Dialog.Close>
          </div>
          <div className="space-y-6">
            <Dropzone
              onDialogClose={() => (dialogProps.onOpenChange ? dialogProps.onOpenChange(false) : () => {})}
            />
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
