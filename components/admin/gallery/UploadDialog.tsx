"use client";
//Components
import { DialogDemo } from "@components/shared/Dialog";
import { Button } from "@components/shared/Button";
//Data
//Types
import type { FormEvent } from "react";
import type { ShootTypes } from "@lib/photoshoot";
import { Dropzone } from "./Dropzone";

//Hooks
import { useState } from "react";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
type Form = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  time: string;
  description: string;
};

export function UploadDialog() {
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();

  const isLoading = isPending || loading;

  return (
    <DialogDemo title={"Upload image"} trigger={<Button>Upload image</Button>}>
      <div className="space-y-2">
        <Dropzone />
      </div>
    </DialogDemo>
  );
}
