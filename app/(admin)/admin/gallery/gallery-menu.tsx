"use client";

import { IconUpload } from "@tabler/icons-react";
import { useCommand } from "@/components/admin/command-provider";

export function GalleryMenu() {
  const { dispatch } = useCommand();
  return (
    <div className="border-b border-b-gray-700 w-full  px-4 py-4 sticky top-0 left-0 flex gap-4 items-center">
      <div className="flex gap-6 items-center">
        <button
          className="flex items-center gap-2 hover:text-error-300"
          onClick={() => dispatch({ type: "dialog", payload: "photo" })}
        >
          <IconUpload size={16} />
          Upload
        </button>
      </div>
    </div>
  );
}
