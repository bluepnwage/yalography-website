"use client";
import { XClose } from "@/lib/icons";
import { Pagination } from "@/components/shared/Pagination";
import { Button, Select } from "@aomdev/ui";
import { CustomDropzone } from "./custom-dropzone";

import { useState } from "react";
import { usePagination } from "@/lib/hooks/usePagination";
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";

import type { SerializedImageFolder } from "@/lib/prisma";
import type { Env } from "@/lib/firebase/storage";

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

  const onDrop = (data: FileList | null) => {
    if (!data) return;
    setFiles(Array.from(data));
  };

  const onUpload = async () => {
    if (files.length === 0) return;
    toggle.on();

    const [{ uploadToCloudinary }, { toast }] = await Promise.all([
      import("@/lib/upload-image"),
      import("react-toastify")
    ]);
    const id = toast.loading("Compressing and uploading images. This may take a while...", {
      autoClose: false
    });
    try {
      const promises = files.map(file =>
        uploadToCloudinary(file, { folderId: selectedFolder ? parseInt(selectedFolder) : undefined })
      );
      await Promise.all(promises);
      refresh();
      toggle.off();
      onDialogClose();
      toast.dismiss(id);
      toast.success("Images successfully uploaded.");
    } catch (error) {
      if (error instanceof Error) {
        toast.dismiss(id);
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

  return (
    <>
      <CustomDropzone multiple onAccept={onDrop} className="h-64" />
      <ul className="space-y-2 mb-10">
        {paginatedList.map((file, key) => (
          <UploadedFile file={file} key={key} onRemove={onRemoveFile} />
        ))}
      </ul>
      {files.length > 5 && <Pagination {...paginationProps} />}
      {/* <Select onValueChange={setSelectedFolder} items={selectData} /> */}

      <Button onClick={onUpload} disabled={isLoading || files.length === 0} fullWidth>
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