"use client";
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";
import { Dropdown } from "@components/shared/Dropdown";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import dynamic from "next/dynamic";

import { toast } from "react-toastify";

import type { FormEvent } from "react";

const DialogDemo = dynamic(() => import("@components/shared/Dialog").then((mod) => mod.Dialog));

type DropdownProps = {
  id: number;
  renameFolder: (name: string) => void;
};

export function FolderDropdown({ id, renameFolder }: DropdownProps) {
  const [dialog, dialogToggle] = useToggle();
  const [renameDialog, renameDialogToggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const [lazyLoad, lazyLoadToggle] = useToggle();

  const onRename = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("folder_name");

    toggle.on();
    try {
      const res = await fetch("/api/folders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name })
      });
      const json = await res.json();
      if (res.ok) {
        renameFolder(name as string);
        renameDialogToggle.off();
        toast.success("Rename successful.");
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

  const onDelete = async () => {
    toggle.on();
    try {
      const res = await fetch("/api/folders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        dialogToggle.off();
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

  const onLazyLoad = () => {
    if (lazyLoad) return;
    lazyLoadToggle.on();
  };

  const isLoading = isPending || loading;
  return (
    <>
      {lazyLoad && (
        <DialogDemo title="Confirm delete" open={dialog} onOpenChange={dialogToggle.set}>
          <p className="mb-2">
            Proceeding will also delete every image associated with this folder. Are you sure you would like to
            continue?
          </p>
          <Button disabled={isLoading} intent="secondary" className="inline-block mr-4">
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={onDelete} intent={"primary"} className="inline-block">
            Confirm
          </Button>
        </DialogDemo>
      )}
      {lazyLoad && (
        <DialogDemo title="Rename folder" open={renameDialog} onOpenChange={renameDialogToggle.set}>
          <form onSubmit={onRename}>
            <Input className="mb-2" label="Folder" name="folder_name" id="folder_name" required />
            <Button disabled={isLoading} intent={"accept"} className="inline-block">
              Confirm
            </Button>
          </form>
        </DialogDemo>
      )}
      <Dropdown.Root>
        <Dropdown.Trigger>
          <button>
            <DotsVertical />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onMouseEnter={onLazyLoad} onClick={renameDialogToggle.on}>
            {" "}
            <Edit />
            Rename folder
          </Dropdown.Item>
          <Dropdown.Item onMouseEnter={onLazyLoad} onClick={dialogToggle.on}>
            <Trash />
            Delete folder
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
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
