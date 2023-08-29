"use client";
import { Image } from "@/components/shared/Image";
import { ActionIcon, Card, Dropdown, TextInput, Button } from "@aomdev/ui";
import { IconTrash, IconEdit, IconCopy, IconDownload } from "@tabler/icons-react";
import { Dialog } from "@aomdev/ui";

import { useToggle } from "@/lib/hooks/useToggle";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useState } from "react";
import { useReducer } from "react";

import type { Images } from "@prisma/client";
import type { FormEvent } from "react";
import { initialState, reducer } from "./image-reducer";

type PropTypes = {
  image: Images;
};

export function UploadedImage({ image: imageData }: PropTypes) {
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [lazyLoad, lazyLoadToggle] = useToggle();
  const [image, setImage] = useState(imageData);
  const [dialog, dispatch] = useReducer(reducer, initialState);

  const onDelete = async () => {
    toggle.on();
    const [{ toast }] = await Promise.all([import("react-toastify")]);
    try {
      const res = await fetch("/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: image.id, publicId: image.publicId })
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

  const onRename = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("image_name") as string;
    toggle.on();

    try {
      const res = await fetch("/api/images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: image.id, name })
      });
      if (res.ok) {
        setImage(prev => ({ ...prev, name }));
        dispatch({ payload: false, type: "renameDialog" });
      } else {
        throw new Error("There was en error renaming the image.");
      }
    } catch (error) {
      const { toast } = await import("react-toastify");
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  const onDownload = async () => {
    const endpoint = new URL("/api/download-image", location.origin);
    endpoint.searchParams.set("name", image.publicId);
    endpoint.searchParams.set("type", image.type);
    try {
      const res = await fetch(endpoint);

      if (res.ok) {
        const reader = res.body?.getReader();
        let chunks: Uint8Array[] = [];
        while (true) {
          const data = await reader?.read();
          if (data?.done) {
            break;
          } else {
            chunks.push(data?.value!);
          }
        }

        const blob = new Blob(chunks, { type: image.type });
        const anchor = document.createElement("a");
        const href = URL.createObjectURL(blob);
        anchor.download = image.name;
        anchor.href = href;
        anchor.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );
        setTimeout(() => URL.revokeObjectURL(href), 100);
      } else {
        const json = await res.json();
        throw new Error(json.message);
      }
    } catch (error) {
      const { toast } = await import("react-toastify");
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const onEditCaption = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const alt = new FormData(e.currentTarget).get("caption") as string;
    toggle.on();
    const { toast } = await import("react-toastify");
    try {
      const res = await fetch("/api/images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt, id: image.id })
      });
      if (res.ok) {
        toast.success("Caption edited.");
        dispatch({ payload: false, type: "captionDialog" });
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to edit caption.");
    } finally {
      toggle.off();
    }
  };

  const isLoading = isPending || loading;

  return (
    <>
      {lazyLoad && (
        <Dialog
          open={dialog.renameDialog}
          onOpenChange={payload => dispatch({ payload, type: "renameDialog" })}
        >
          <Dialog.Content blur className="w-1/4">
            <Dialog.Title>Rename image</Dialog.Title>

            <form onSubmit={onRename} className="space-y-4 mt-6">
              <TextInput defaultValue={image.name} label="Name" id="image_name" name="image_name" required />
              <Button disabled={isLoading} className="block ml-auto">
                Submit
              </Button>
            </form>
          </Dialog.Content>
        </Dialog>
      )}
      {lazyLoad && (
        <Dialog
          open={dialog.captionDialog}
          onOpenChange={payload => dispatch({ payload, type: "captionDialog" })}
        >
          <Dialog.Content blur className="w-1/4">
            <Dialog.Title>Edit caption</Dialog.Title>
            <form onSubmit={onEditCaption} className="space-y-4 mt-6">
              <TextInput label="Caption" id="caption" name="caption" />
              <Button disabled={isLoading} className="block ml-auto">
                Submit
              </Button>
            </form>
          </Dialog.Content>
        </Dialog>
      )}
      <Card className="col-span-3 h-72 flex flex-col gap-4 relative overflow-hidden ">
        {isLoading && (
          <div
            aria-hidden
            className="top-0 left-0  bg-black/10 animate-pulse dark:bg-zinc-700/60 z-50 w-full h-full absolute"
          ></div>
        )}
        <div className="group relative -mx-4 -mt-4 basis-3/4 overflow-hidden ">
          <Dropdown>
            <Dropdown.Trigger asChild>
              <ActionIcon
                variant={"filled"}
                color="gray"
                aria-label="Edit image"
                className="absolute right-5 top-5 z-[100]"
              >
                <DotsVertical />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item
                icon={<IconEdit size={16} className=" " />}
                onClick={() => dispatch({ payload: true, type: "renameDialog" })}
                onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}
              >
                Rename image
              </Dropdown.Item>
              <Dropdown.Item
                icon={<IconEdit size={16} className=" " />}
                onClick={() => dispatch({ payload: true, type: "captionDialog" })}
                onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}
              >
                Edit caption
              </Dropdown.Item>
              <Dropdown.Item icon={<IconCopy size={16} className=" " />} onClick={onCopy}>
                Copy url
              </Dropdown.Item>
              <Dropdown.Item icon={<IconDownload size={16} className=" " />} onClick={onDownload}>
                Download image
              </Dropdown.Item>
              <Dropdown.Item color="error" icon={<IconTrash size={16} className=" " />} onClick={onDelete}>
                Delete image
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          <Image
            alt={""}
            containerClass="w-full blur-sm h-full absolute top-0 left-0"
            src={image.url}
            width={image.width}
            height={image.height}
            className="blur-sm object-cover  w-full h-full"
          />
          <Image
            containerClass="w-full h-full z-10"
            width={image.width}
            height={image.height}
            alt={""}
            src={image.url}
            className="h-full w-full object-contain z-10"
          />
        </div>
        <div className="grow">
          <div className="flex justify-between ">
            <p className="font-bold text-xl truncate">{image.name}</p>
          </div>
          <div className="flex justify-between">
            <p>{image.type}</p>
            <p>{(image.size / 1000).toFixed(2)}Kb</p>
          </div>
        </div>
      </Card>
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
    <svg
      height={16}
      width={16}
      className={"stroke-gray-100"}
      viewBox="0 0 24 24"
      xmlns="http:www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
        <circle cx="12" cy="5" r="1" />
      </g>
    </svg>
  );
}
