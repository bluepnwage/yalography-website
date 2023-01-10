"use client";
import { Button } from "@components/shared/Button";
import { Dropzone as MantineDropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import { useToggle } from "@lib/hooks/useToggle";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { Select } from "@components/shared/Select";
import { toast } from "react-toastify";

type PropTypes = {
  onDrop: (file: File | null) => void;
};

export function Dropzone({ onDrop }: PropTypes) {
  const [loading, toggle] = useToggle();
  const [selectedFolder, setSelectedFolder] = useState("");
  const [isPending, refresh] = useRouteRefresh();

  //   const onUpload = async () => {
  //     toggle.on();
  //     try {
  //       const { uploadImage } = await import("@lib/firebase/storage");
  //       const promises = files.map((file) => uploadImage(file, selectedFolder ? parseInt(selectedFolder) : undefined));
  //       await Promise.all(promises);
  //       refresh();
  //       toggle.off();
  //       if (files.length > 1) {
  //         toast.success("Images successfully uploaded.");
  //       } else {
  //         toast.success("Image successfully uploaded.");
  //       }
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         toast.error(error.message);
  //       }
  //     } finally {
  //       toggle.off();
  //     }
  //   };

  const isLoading = isPending || loading;

  return (
    <>
      <MantineDropzone
        classNames={{
          root: "data-[loading=true]:bg-zinc-500 grow w-2/4 dark:data-[loading=true]:bg-zinc-900 hover:bg-zinc-200/30 dark:hover:bg-zinc-700/30 dark:bg-zinc-800 bg-white border-zinc-200 dark:border-zinc-700"
        }}
        onDrop={(files) => onDrop(files[0])}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        loading={isLoading}
      >
        <div className="flex justify-center gap-4" style={{ minHeight: 220, pointerEvents: "none" }}>
          <MantineDropzone.Accept>
            <p>Check</p>
          </MantineDropzone.Accept>
          <MantineDropzone.Reject>
            <p>X</p>
          </MantineDropzone.Reject>
          <MantineDropzone.Idle>
            <Photo />
          </MantineDropzone.Idle>

          <div>
            <p className="text-xl font-semibold">Drag images here or click to select files</p>
            <p className="text-gray-400">Attach as many files as you like, each file should not exceed 5mb</p>
          </div>
        </div>
      </MantineDropzone>
      {/* 
      <Button onClick={onUpload} disabled={isLoading} fullWidth intent={"accept"}>
        Submit
      </Button> */}
    </>
  );
}

function Photo() {
  return (
    <svg
      height={64}
      width={64}
      className={"stroke-gray-900 dark:stroke-gray-100"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M15 8h.01" />
        <path d="M4 15l4-4a3 5 0 0 1 3 0l5 5" />
        <path d="M14 14l1-1a3 5 0 0 1 3 0l2 2" />
        <rect height="16" width="16" rx="3" x="4" y="4" />
      </g>
    </svg>
  );
}
