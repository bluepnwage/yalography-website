"use client";
//Components
import { DialogDemo } from "@components/shared/Dialog";
import { Button } from "@components/shared/Button";

import { Dropzone } from "./Dropzone";

import { useToggle } from "@lib/hooks/useToggle";

export function UploadDialog() {
  const [dialog, dialogToggle] = useToggle();
  return (
    <DialogDemo
      open={dialog}
      onOpenChange={dialogToggle.set}
      title={"Upload image"}
      trigger={<Button>Upload image</Button>}
    >
      <div className="space-y-2">
        <Dropzone onDialogClose={dialogToggle.off} />
      </div>
    </DialogDemo>
  );
}
