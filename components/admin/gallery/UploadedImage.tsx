"use client";
import { Dropdown } from "@components/shared/Dropdown";
import { Image } from "@components/shared/Image";
import { useToggle } from "@lib/hooks/useToggle";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("./ImageModal").then((mod) => mod.ImageModal));

import type { Images } from "@prisma/client";

type PropTypes = {
  image: Images;
};

export function UploadedImage({ image }: PropTypes) {
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [lazyLoad, lazyLoadToggle] = useToggle();
  const [dialog, dialogToggle] = useToggle();

  const onDelete = async () => {
    toggle.on();
    const [{ toast }, { deleteImage }] = await Promise.all([import("react-toastify"), import("@lib/firebase/storage")]);
    try {
      await deleteImage(image.fullPath);
      const res = await fetch("/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: image.id })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        toast.success(json.message);
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  const onCopy = async () => {
    const { toast } = await import("react-toastify");
    await navigator.clipboard.writeText(image.url);
    toast("URL copied to clipboard");
  };

  const onRename = async () => {
    toggle.on();

    try {
      const res = await fetch("/api/images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: image.id })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message, { cause: json.error });
      }
    } catch (error) {
      const { toast } = await import("react-toastify");
      if (error instanceof Error) {
        toast.error("There was an error renaming the image");
      }
    }
  };

  const isLoading = isPending || loading;

  return (
    <>
      {lazyLoad && <Dialog opened={dialog} onValueChange={dialogToggle.set} />}
      <div className="col-span-4 h-72 flex flex-col gap-4 relative bg-white dark:bg-zinc-800 rounded-md p-4 overflow-hidden ">
        {isLoading && (
          <div
            aria-hidden
            className="top-0 left-0  bg-black/10 animate-pulse dark:bg-zinc-700/60 z-50 w-full h-full absolute"
          ></div>
        )}
        <div className="group relative -mx-4 -mt-4 basis-3/4 overflow-hidden ">
          <Dropdown>
            <Dropdown.Trigger>
              <button
                className={`flex h-9 w-9 rounded-full items-center z-10 justify-center bg-zinc-700 absolute right-5 top-5`}
                aria-label="Edit image"
              >
                <DotsVertical />
              </button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Label>Manage image</Dropdown.Label>
              <Dropdown.Item onClick={dialogToggle.on} onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}>
                <Edit />
                Rename image
              </Dropdown.Item>
              <Dropdown.Item onClick={onCopy}>
                <Upload />
                Copy url
              </Dropdown.Item>
              <Dropdown.Item>
                <Download />
                Download image
              </Dropdown.Item>
              <Dropdown.Item onClick={onDelete}>
                <Trash />
                Delete image
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          <Image
            containerClass="w-full h-full"
            width={image.width}
            height={image.height}
            alt={""}
            src={image.url}
            className="h-full w-full object-cover z-0"
          />
        </div>
        <div className="grow">
          <div className="flex justify-between ">
            <p className="font-bold text-xl">{truncate(image.name)}</p>
          </div>
          <div className="flex justify-between">
            <p>{image.type}</p>
            <p>{(image.size / 1000).toFixed(2)}Kb</p>
          </div>
        </div>
      </div>
    </>
  );
}

function truncate(word: string) {
  if (word.length > 15) return `${word.slice(0, 10)}...`;
  return word;
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
