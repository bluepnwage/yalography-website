"use client";
import { useGallery } from "./GalleryProvider";

export function Folders() {
  const folders = useGallery("folders");
  return (
    <>
      <div className="col-span-full">
        <h1 className="font-bold text-xl">Folders ({folders.length})</h1>
        {folders.length === 0 && <p>You don&apos;t have any folders</p>}
      </div>

      {folders.length > 0 &&
        folders.map((folder, key) => {
          return (
            <div key={key} className="col-span-4 bg-white p-4 dark:bg-zinc-800 rounded-md">
              <p>
                <FoldersIcon />
                {folder.name}
              </p>
            </div>
          );
        })}
    </>
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
