"use client";
//Components
import { Button } from "@components/shared/Button";
import { Dropzone } from "./Dropzone";
import dynamic from "next/dynamic";

const DialogDemo = dynamic(() => import("@components/shared/Dialog").then((mod) => mod.DialogDemo));

import { useToggle } from "@lib/hooks/useToggle";

export function UploadDialog() {
  const [dialog, dialogToggle] = useToggle();
  const [lazyLoad, lazyLoadToggle] = useToggle();

  const onLazyLoad = () => {
    if (lazyLoad) return;
    lazyLoadToggle.on();
  };

  return (
    <>
      <Button onClick={dialogToggle.on} onMouseEnter={onLazyLoad}>
        Upload image
      </Button>
      {lazyLoad && (
        <DialogDemo open={dialog} onOpenChange={dialogToggle.set} title={"Upload image"}>
          <div className="space-y-2">
            <Dropzone onDialogClose={dialogToggle.off} />
          </div>
        </DialogDemo>
      )}
    </>
  );
}
