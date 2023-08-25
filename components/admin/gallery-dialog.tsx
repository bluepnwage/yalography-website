"use client";
//Components
import { Dialog } from "@aomdev/ui";
import { Dropzone } from "./gallery-dropzone";

import type { SerializedImageFolder } from "@/lib/prisma";
import type { Env } from "@/lib/firebase/storage";
import type { DialogProps } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";

type PropTypes = {
  folders: SerializedImageFolder[];
  dialogProps: DialogProps;
} & Env;

export function GalleryDialog({ folders, environment, dialogProps }: PropTypes) {
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
              environment={environment}
              folders={folders}
              onDialogClose={() => (dialogProps.onOpenChange ? dialogProps.onOpenChange(false) : () => {})}
            />
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
