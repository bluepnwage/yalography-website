"use client";
import { Button } from "@components/shared/Button";
import { Dropzone as MantineDropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Select } from "@components/shared/Select";
import { Check, XClose } from "@lib/icons";
import { Pagination } from "@components/shared/Pagination";

import { useState } from "react";
import { usePagination } from "@lib/hooks/usePagination";
import { useToggle } from "@lib/hooks/useToggle";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";

import type { SerializedImageFolder } from "@lib/prisma";
import type { Env } from "@lib/firebase/storage";

type PropTypes = {
  onDialogClose: () => void;
  folders: SerializedImageFolder[];
} & Env;

export function Dropzone({ onDialogClose, folders, environment }: PropTypes) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, toggle] = useToggle();
  const [selectedFolder, setSelectedFolder] = useState("");
  const [isPending, refresh] = useRouteRefresh();
  const { paginatedList, ...paginationProps } = usePagination(5, files);

  const onDrop = (data: File[]) => {
    setFiles(data);
  };

  const onUpload = async () => {
    if (files.length === 0) return;
    toggle.on();
    const [{ uploadImage }, { toast }] = await Promise.all([
      import("@lib/firebase/storage"),
      import("react-toastify")
    ]);
    try {
      const promises = files.map(file =>
        uploadImage(file, { folderID: selectedFolder ? parseInt(selectedFolder) : undefined, environment })
      );
      await Promise.all(promises);
      refresh();
      toggle.off();
      onDialogClose();
      if (files.length > 1) {
        toast.success("Images successfully uploaded.");
      } else {
        toast.success("Image successfully uploaded.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  const onRemoveFile = (file: File) => {
    setFiles(prev => prev.filter(f => file.name !== f.name));
  };

  const isLoading = isPending || loading;
  const selectData = folders.map(folder => {
    return {
      label: folder.name,
      value: `${folder.id}`
    };
  });

  const onFileReject = async () => {
    const { toast } = await import("react-toastify");
    toast.error("Some of the files you uploaded are too large");
  };

  return (
    <>
      {files.length === 0 && (
        <MantineDropzone
          classNames={{
            root: "data-[loading=true]:bg-zinc-500 dark:data-[loading=true]:bg-zinc-900 hover:bg-zinc-200/30 dark:hover:bg-zinc-700/30 dark:bg-zinc-800 bg-white border-zinc-200 dark:border-zinc-700"
          }}
          onDrop={onDrop}
          onReject={onFileReject}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          loading={isLoading}
        >
          <div className="flex justify-center gap-4" style={{ minHeight: 220, pointerEvents: "none" }}>
            <MantineDropzone.Accept>
              <Check size={64} className="stroke-emerald-600 dark:stroke-emerald-500" />
            </MantineDropzone.Accept>
            <MantineDropzone.Reject>
              <XClose size={64} fill className="fill-red-600 dark:fill-red-500" />
            </MantineDropzone.Reject>
            <MantineDropzone.Idle>
              <Photo />
            </MantineDropzone.Idle>

            <div>
              <p className="text-xl font-semibold">Drag images here or click to select files</p>
              <p className="text-gray-400">
                Attach as many files as you like, each file should not exceed 5mb
              </p>
            </div>
          </div>
        </MantineDropzone>
      )}
      <ul className="space-y-2">
        {paginatedList.map((file, key) => (
          <UploadedFile file={file} key={key} onRemove={onRemoveFile} />
        ))}
      </ul>
      {files.length > 5 && <Pagination {...paginationProps} />}
      <Select onValueChange={setSelectedFolder} data={selectData} label="Add to folder" />

      <Button onClick={onUpload} disabled={isLoading || files.length === 0} fullWidth intent={"accept"}>
        Submit
      </Button>
    </>
  );
}

type FileProps = {
  file: File;
  onRemove: (file: File) => void;
};

function UploadedFile({ file, onRemove }: FileProps) {
  const onClick = () => onRemove(file);
  return (
    <li className="flex justify-between border-b pb-2 dark:border-zinc-700 border-zinc-300 last-of-type:border-b-0">
      <p style={{ width: "clamp(15ch, 25ch, 75%)" }} className="line-clamp-1">
        {file.name}
      </p>
      <button onClick={onClick} aria-label="Remove file">
        <XClose fill />
      </button>
    </li>
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
