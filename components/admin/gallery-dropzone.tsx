"use client";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@aomdev/ui";
import { CustomDropzone } from "./custom-dropzone";
import { IconX } from "@tabler/icons-react";

import { useActionState, useRef, useState } from "react";
import { usePagination } from "@/lib/hooks/usePagination";
import { uploadImageAction } from "@/app/(admin)/admin/gallery/actions";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/upload-image";

type PropTypes = {
  onDialogClose: () => void;
};

export function Dropzone({ onDialogClose }: PropTypes) {
  const [files, setFiles] = useState<File[]>([]);

  const id = useRef<string | number>("");
  const { paginatedList, ...paginationProps } = usePagination(5, files);
  const [, formAction, pending] = useActionState(async () => {
    id.current = toast.loading("Uploading files");
    const uploadedFiles = [];
    for (const file of files) {
      const status = await uploadToCloudinary(file as Blob, {});
      if (status.success) {
        const { data, options } = status;
        uploadedFiles.push({
          alt: "",
          height: data.height,
          width: data.width,
          name: crypto.randomUUID(),
          url: data.url,
          type: data.format,
          size: data.bytes,
          publicId: data.public_id,
          projectId: options?.projectId,
          folderId: options?.folderId,
          resourceType: file.type.includes("video") ? "video" : "image"
        });
        toast.loading(`Uploaded ${uploadedFiles.length}/${files.length} files`, { id: id.current });
      } else {
        toast.error("Failed to upload image", { description: `${file.name}`, duration: 5000 });
      }
    }
    await uploadImageAction(null, uploadedFiles);
    toast.success("Files uploaded successfully", { id: id.current });
    onDialogClose();
  }, null);

  const onDrop = (data: FileList | null) => {
    if (!data) return;
    setFiles(Array.from(data));
  };

  const onRemoveFile = (file: File) => {
    setFiles((prev) => prev.filter((f) => file.name !== f.name));
  };

  return (
    <form action={formAction}>
      <CustomDropzone
        multiple
        onAccept={onDrop}
        className="h-64"
      />
      <ul className="space-y-2 mb-10">
        {paginatedList.map((file, key) => (
          <UploadedFile
            file={file}
            key={key}
            onRemove={onRemoveFile}
          />
        ))}
      </ul>
      {files.length > 5 && <Pagination {...paginationProps} />}

      <Button
        disabled={pending || files.length === 0}
        className="block ml-auto"
      >
        Submit
      </Button>
    </form>
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
      <p
        style={{ width: "clamp(15ch, 25ch, 75%)" }}
        className="line-clamp-1"
      >
        {file.name}
      </p>
      <button
        onClick={onClick}
        aria-label="Remove file"
      >
        <IconX size={16} />
      </button>
    </li>
  );
}
