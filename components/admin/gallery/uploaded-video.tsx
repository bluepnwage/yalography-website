"use client";
import { Image } from "@/components/shared/Image";
import { ActionIcon, Card, Dropdown, TextInput, Button } from "@aomdev/ui";
import {
  IconTrash,
  IconEdit,
  IconCopy,
  IconDownload,
  IconPhoto,
  IconDotsVertical
} from "@tabler/icons-react";
import { Dialog } from "@aomdev/ui";

import { useToggle } from "@/lib/hooks/useToggle";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useState } from "react";
import { useReducer } from "react";

import type { Resources } from "@prisma/client";
import type { FormEvent } from "react";
import { initialState, reducer } from "./image-reducer";

type PropTypes = {
  image: Resources;
};

export function UploadedVideo({ image: imageData }: PropTypes) {
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
        setImage((prev) => ({ ...prev, name }));
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
    return;
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
          onOpenChange={(payload) => dispatch({ payload, type: "renameDialog" })}
        >
          <Dialog.Content
            blur
            className="w-1/4"
          >
            <Dialog.Title>Rename image</Dialog.Title>

            <form
              onSubmit={onRename}
              className="space-y-4 mt-6"
            >
              <TextInput
                defaultValue={image.name}
                label="Name"
                id="image_name"
                name="image_name"
                required
              />
              <Button
                disabled={isLoading}
                className="block ml-auto"
              >
                Submit
              </Button>
            </form>
          </Dialog.Content>
        </Dialog>
      )}
      {lazyLoad && (
        <Dialog
          open={dialog.captionDialog}
          onOpenChange={(payload) => dispatch({ payload, type: "captionDialog" })}
        >
          <Dialog.Content
            blur
            className="w-1/4"
          >
            <Dialog.Title>Edit caption</Dialog.Title>
            <form
              onSubmit={onEditCaption}
              className="space-y-4 mt-6"
            >
              <TextInput
                label="Caption"
                id="caption"
                name="caption"
              />
              <Button
                disabled={isLoading}
                className="block ml-auto"
              >
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
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item
                icon={
                  <IconEdit
                    size={16}
                    className=" "
                  />
                }
                onClick={() => dispatch({ payload: true, type: "renameDialog" })}
                onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}
              >
                Rename image
              </Dropdown.Item>
              <Dropdown.Item
                icon={
                  <IconEdit
                    size={16}
                    className=" "
                  />
                }
                onClick={() => dispatch({ payload: true, type: "captionDialog" })}
                onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}
              >
                Edit caption
              </Dropdown.Item>
              <Dropdown.Item
                icon={
                  <IconCopy
                    size={16}
                    className=" "
                  />
                }
                onClick={onCopy}
              >
                Copy url
              </Dropdown.Item>
              <Dropdown.Item
                icon={
                  <IconDownload
                    size={16}
                    className=" "
                  />
                }
                onClick={onDownload}
              >
                Download image
              </Dropdown.Item>
              <Dropdown.Item
                color="error"
                icon={
                  <IconTrash
                    size={16}
                    className=" "
                  />
                }
                onClick={onDelete}
              >
                Delete image
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          <div className="relative">
            <video
              width={image.width}
              height={image.height}
              src={image.url}
              className="h-full w-full relative object-contain z-50"
            />
          </div>
        </div>
        <div className="grow text-gray-600 dark:text-gray-200">
          <div className="flex justify-between mb-4">
            <p className="font-medium text-lg truncate">{image.name}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <IconPhoto size={16} />
              <p className="uppercase">{image.type}</p>
            </div>
            <p>
              {image.width} x {image.height}
            </p>
            <p>{returnFileSize(image.size)}</p>
          </div>
        </div>
      </Card>
    </>
  );
}

function returnFileSize(number: number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}
