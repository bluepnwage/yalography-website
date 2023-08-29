"use client";
import { Dialog, Button, DialogProps } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";
import { CustomDropzone } from "../custom-dropzone";
import { useState } from "react";

type PropTypes = {
  onImageAdd: (files: File[]) => void;
} & DialogProps;

export function NewImageDialog({ onImageAdd, ...props }: PropTypes) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (files: FileList | null) => {
    if (files) {
      setFiles(Array.from(files));
    }
  };

  const onToggle = (val: boolean) => {
    if (props.onOpenChange) props.onOpenChange(val);
    setFiles([]);
  };

  const onSubmit = () => {
    onImageAdd(files);
    setFiles([]);
    if (props.onOpenChange) props.onOpenChange(false);
  };

  return (
    <Dialog {...props} onOpenChange={onToggle}>
      <Dialog.Content className="w-1/4">
        <div className="flex justify-between mb-6">
          <Dialog.Title>Add new Image</Dialog.Title>
          <Dialog.Close>
            <IconX size={"75%"} />
          </Dialog.Close>
        </div>
        <CustomDropzone onAccept={onDrop} multiple className="h-64" />
        <div className="grid grid-cols-3 gap-2 mt-4">
          {files.map((file, index) => {
            return <img key={index} src={URL.createObjectURL(file)} />;
          })}
        </div>
        <Button onClick={onSubmit} className="block mt-4 ml-auto">
          Submit
        </Button>
      </Dialog.Content>
    </Dialog>
  );
}
