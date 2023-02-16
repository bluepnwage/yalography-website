"use client";
//Components
import { Button } from "@components/shared/Button";
// import { Dropzone } from "./Dropzone";
import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("@components/shared/Dialog").then(mod => mod.Dialog));
const Dropzone = dynamic(() => import("./Dropzone").then(mod => mod.Dropzone));

import { useToggle } from "@lib/hooks/useToggle";
import type { SerializedImageFolder } from "@lib/prisma";
import type { Env } from "@lib/firebase/storage";

type PropTypes = {
  folders: SerializedImageFolder[];
} & Env;

export function UploadDialog({ folders, environment }: PropTypes) {
  const [dialog, dialogToggle] = useToggle();
  const [lazyLoad, lazyLoadToggle] = useToggle();

  return (
    <>
      <Button onClick={dialogToggle.on} onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}>
        Upload image
      </Button>
      {lazyLoad && (
        <Dialog open={dialog} onOpenChange={dialogToggle.set} title={"Upload image"}>
          <div className="space-y-2">
            {lazyLoad && (
              <Dropzone environment={environment} folders={folders} onDialogClose={dialogToggle.off} />
            )}
          </div>
        </Dialog>
      )}
    </>
  );
}
