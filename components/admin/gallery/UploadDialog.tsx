"use client";
//Components
import { Button } from "@components/shared/Button";
import { Dropzone } from "./Dropzone";
import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("@components/shared/Dialog").then(mod => mod.Dialog));

import { useToggle } from "@lib/hooks/useToggle";
import type { SerializedImageFolder } from "@lib/prisma";
import { Env } from "@lib/firebase/storage";

type PropTypes = {
  folders: SerializedImageFolder[];
} & Env;

export function UploadDialog({ folders, environment }: PropTypes) {
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
        <Dialog open={dialog} onOpenChange={dialogToggle.set} title={"Upload image"}>
          <div className="space-y-2">
            <Dropzone environment={environment} folders={folders} onDialogClose={dialogToggle.off} />
          </div>
        </Dialog>
      )}
    </>
  );
}
