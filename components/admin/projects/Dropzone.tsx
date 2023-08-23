"use client";
import { Dropzone as MantineDropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Check, XClose } from "@/lib/icons";

type PropTypes = {
  onDrop: (file: File[] | null) => void;
  multiple?: boolean;
};

export function Dropzone({ onDrop, multiple }: PropTypes) {
  const onReject = async () => {
    const { toast } = await import("react-toastify");
    toast.error("The image you dropped is too large.");
  };

  return (
    <>
      <MantineDropzone
        multiple={multiple}
        classNames={{
          root: "data-[loading=true]:bg-zinc-500 grow basis-2/4 dark:data-[loading=true]:bg-zinc-900 hover:bg-zinc-200/30 dark:hover:bg-zinc-700/30 dark:bg-zinc-800 bg-white border-zinc-200 dark:border-zinc-700"
        }}
        onDrop={files => onDrop(files)}
        onReject={onReject}
        accept={IMAGE_MIME_TYPE}
      >
        <div className="flex justify-center gap-4" style={{ minHeight: 220, pointerEvents: "none" }}>
          <MantineDropzone.Accept>
            <Check className="stroke-emerald-600 dark:stroke-emerald-500" size={64} />
          </MantineDropzone.Accept>
          <MantineDropzone.Reject>
            <XClose className="fill-red-600 dark:fill-red-500" size={64} />
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
