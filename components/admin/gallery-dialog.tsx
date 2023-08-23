"use client";
//Components
import { Button } from "@/components/shared/Button";
import { Dialog } from "@aomdev/ui";
import { Dropzone } from "./gallery-dropzone";

import type { SerializedImageFolder } from "@/lib/prisma";
import type { Env } from "@/lib/firebase/storage";
import type { DialogProps } from "@aomdev/ui";

type PropTypes = {
  folders: SerializedImageFolder[];
  dialogProps: DialogProps;
} & Env;

export function GalleryDialog({ folders, environment, dialogProps }: PropTypes) {
  return (
    <>
      <Dialog {...dialogProps}>
        <Dialog.Content className="w-2/4">
          <div className="space-y-2">
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
