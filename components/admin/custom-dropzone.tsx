"use client";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { IconPhoto } from "@tabler/icons-react";
import { DragEvent, FormEvent, useRef, useState } from "react";

type PropTypes = {
  onAccept?: (file: FileList | null) => void;

  className?: string;
  multiple?: boolean;
};

export function CustomDropzone({ className, multiple, onAccept }: PropTypes) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragged, setDragged] = useState(false);

  const _onDropzone = () => {
    fileRef.current?.click();
  };

  const _onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragged(false);
    if (onAccept) {
      onAccept(e.dataTransfer.files);
    }
  };

  const _onDragEnter = () => setDragged(true);
  const _onDragLeave = () => setDragged(false);

  const _onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const _onChange = (e: FormEvent<HTMLInputElement>) => {
    if (onAccept) {
      onAccept(e.currentTarget.files ? e.currentTarget.files : null);
    }
  };

  return (
    <div
      draggable={"true"}
      onDragLeaveCapture={_onDragLeave}
      onDragEnterCapture={_onDragEnter}
      onDragOverCapture={_onDragOver}
      onDropCapture={_onDrop}
      onClick={_onDropzone}
      style={{ background: "#070c17" }}
      className={cardStyles({
        className: `gap-4 cursor-pointer flex items-center   justify-center ${
          dragged ? "opacity-50" : "opacity-100"
        } ${className}`
      })}
    >
      <IconPhoto
        size={48}
        className="pointer-events-none"
      />
      <div className="pointer-events-none">
        <p className="font-semibold text-xl mb-1">Drag and drop media here</p>
        {/* <p className="text-gray-200">Media must not exceed 5mb</p> */}
      </div>
      <input
        onChange={_onChange}
        type="file"
        className="hidden"
        accept=".jpg,.png,.mp4"
        ref={fileRef}
        multiple={multiple}
        name="files"
      />
    </div>
  );
}
