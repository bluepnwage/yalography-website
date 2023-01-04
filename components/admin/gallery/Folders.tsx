"use client";
import { useGallery } from "./GalleryProvider";
import { CreateFolder } from "./CreateFolder";
import { FolderDropdown } from "./FolderDropdown";
import { SerializedImageFolder } from "@lib/prisma";
import { useState } from "react";
import Link from "next/link";

export function Folders() {
  const { folders } = useGallery();
  return (
    <>
      <div className="col-span-full">
        <h1 className="font-bold text-xl">Folders ({folders.length})</h1>
        {folders.length === 0 && (
          <>
            <p className="mb-2">You don&apos;t have any folders</p>
            <CreateFolder />
          </>
        )}
      </div>

      {folders.length > 0 &&
        folders.map((folder) => {
          return <Folder folder={folder} key={folder.id} />;
        })}
    </>
  );
}

type PropTypes = {
  folder: SerializedImageFolder;
};

function Folder({ folder }: PropTypes) {
  const [imageFolder, setImageFolder] = useState(folder);

  const renameFolder = (name: string) => {
    setImageFolder((prev) => ({ ...prev, name }));
  };
  return (
    <div className="col-span-4 items-start flex justify-between bg-white p-4 dark:bg-zinc-800 rounded-md">
      <div>
        <p className="mb-2">
          <FoldersIcon />
          {imageFolder.name}
        </p>
        <Link href={`/admin/gallery/folders/${folder.id}`} className="text-yellow-600 dark:text-yellow-500">
          View folder
        </Link>
      </div>

      <FolderDropdown renameFolder={renameFolder} id={folder.id} />
    </div>
  );
}

function FoldersIcon() {
  return (
    <svg
      height={24}
      width={24}
      className={"stroke-gray-900 dark:stroke-gray-100"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
        <path d="M17 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      </g>
    </svg>
  );
}
