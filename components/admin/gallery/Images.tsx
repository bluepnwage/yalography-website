"use client";

import { Dropdown } from "@components/shared/Dropdown";
import { useGallery } from "./GalleryProvider";

export function Images() {
  const images = useGallery("images");
  return (
    <>
      <div className="col-span-full">
        <h2 className="font-bold text-xl">Images ({images.length})</h2>
        {images.length === 0 && <p>You haven&apos; uploaded any images</p>}
      </div>
      {images?.map((image, key) => {
        return (
          <div key={key} className="col-span-4 bg-white dark:bg-zinc-800 rounded-md p-4 overflow-hidden space-y-4">
            <figure className=" group -mx-4 -mt-4 h-48 relative">
              <Dropdown.Root>
                <Dropdown.Trigger>
                  <button
                    className={`flex h-9 w-9 rounded-full items-center justify-center bg-zinc-700 absolute right-5 top-5`}
                    aria-label="Edit image"
                  >
                    <DotsVertical />
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Label>Manage image</Dropdown.Label>
                  <Dropdown.Item>
                    <Edit />
                    Rename image
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Upload />
                    Copy url
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Download />
                    Download image
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Trash />
                    Delete image
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
              <img src={image.url} />
            </figure>
            <div className="flex justify-between">
              <p className="font-bold text-xl">Random image name</p>
            </div>
            <div className="flex justify-between">
              <p>image/png</p>
              <p>751kb</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

function Trash() {
  return (
    <svg
      height={16}
      width={16}
      className={"mr-2 inline-block stroke-yellow-600 dark:stroke-yellow-500"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 7h16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
        <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </g>
    </svg>
  );
}

function Download() {
  return (
    <svg
      height={16}
      width={16}
      className={"mr-2 inline-block stroke-yellow-600 dark:stroke-yellow-500"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        <path d="M7 11l5 5 5-5" />
        <path d="M12 4v12" />
      </g>
    </svg>
  );
}

function Upload() {
  return (
    <svg
      height={16}
      width={16}
      className={"mr-2 inline-block stroke-yellow-600 dark:stroke-yellow-500"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        <path d="M7 9l5-5 5 5" />
        <path d="M12 4v12" />
      </g>
    </svg>
  );
}

function Edit() {
  return (
    <svg
      height={16}
      width={16}
      className={"mr-2 inline-block stroke-yellow-600 dark:stroke-yellow-500"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
        <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415z" />
        <path d="M16 5l3 3" />
      </g>
    </svg>
  );
}

function DotsVertical() {
  return (
    <svg height={16} width={16} className={"stroke-gray-100"} viewBox="0 0 24 24" xmlns="http:www.w3.org/2000/svg">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
        <circle cx="12" cy="5" r="1" />
      </g>
    </svg>
  );
}
