"use client";
import { SubmitButton } from "@/components/submit-button";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";
import { ActionIcon, Dropdown, Dialog, Button, TextInput } from "@aomdev/ui";
import {
  IconDots,
  IconCopy,
  IconTrash,
  IconLayout,
  IconGlobe,
  IconEdit,
  IconUpload,
  IconX,
  IconLoader
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type PropTypes = {
  id: number;
  published: boolean;
  name: string;
};

export function ProjectDropdown({ published, id, name }: PropTypes) {
  const [isPending, refresh] = useRouteRefresh();
  const router = useRouter();
  const [loading, toggle] = useToggle();
  const [dialog, setDialog] = useState<"" | "rename" | "delete">("");

  const onStatus = async () => {
    const endpoint = new URL("/api/projects", location.origin);
    endpoint.searchParams.set("revalidate", `1`);
    toggle.on();
    const { toast } = await import("react-hot-toast");
    const toastId = toast.loading(published ? "Unpublishing project..." : "Publishing project");
    try {
      //Call on save so admin woudlnt have to remember saving everytime
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published, id })
      });
      if (res.ok) {
        toast.success(published ? "Project unpublished" : "Project published", { id: toastId });
        refresh();
        router.push(`/admin/projects/${id}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to update project", { id: toastId });
    } finally {
      toggle.off();
    }
  };

  const onDelete = async () => {
    toggle.on();
    const { toast } = await import("react-hot-toast");

    const endpoint = new URL("/api/projects", location.origin);
    endpoint.searchParams.set("revalidate", "0");
    const toastID = toast.loading("Deleting project.");

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (res.ok) {
        toast.success(json.message, { id: toastID });
        refresh();
        router.push("/admin/projects");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastID });
      }
    } finally {
      toggle.off();
    }
  };

  const onRename = async (e: FormEvent<HTMLFormElement>) => {
    const form = Object.fromEntries(new FormData(e.currentTarget));
    e.preventDefault();
    toggle.on();
    const { toast } = await import("react-hot-toast");
    const res = await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.project_name.toString(), id })
    });
    if (!res.ok) {
      toast.error("Failed to rename project.");
    } else {
      refresh();
    }
    toggle.off();
  };

  const isLoading = loading || isPending;

  return (
    <>
      <Dialog open={dialog === "delete"} onOpenChange={payload => setDialog(payload ? "delete" : "")}>
        <Dialog.Content className="w-1/4 space-y-4">
          <div className="flex items-center justify-between">
            <Dialog.Title>Confirm delete</Dialog.Title>
            <Dialog.Close>
              <IconX size={16} />
            </Dialog.Close>
          </div>
          <p>This action is irreversible. Are you sure you want to proceed?</p>
          <div className="flex gap-4  justify-end">
            <Button disabled={isLoading} onClick={() => setDialog("")} variant={"neutral"}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onDelete}
              variant={"error"}
              className="relative group flex items-center justify-center1"
            >
              <span className="group-disabled:opacity-100 opacity-0 absolute">
                <IconLoader className="animate-spin" size={16} />
              </span>
              <span className="group-disabled:opacity-0">Delete</span>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>
      <Dialog open={dialog === "rename"} onOpenChange={payload => setDialog(payload ? "delete" : "")}>
        <Dialog.Content className="space-y-6 w-1/4">
          <Dialog.Title>Rename project</Dialog.Title>
          <form onSubmit={onRename} className="space-y-4">
            <TextInput defaultValue={name} name="project_name" id="project_name" />
            <div className="flex gap-4 justify-end">
              <Button type="button" variant={"neutral"} onClick={() => setDialog("")}>
                Cancel
              </Button>
              <SubmitButton disabled={loading}>Submit</SubmitButton>
            </div>
          </form>
        </Dialog.Content>
      </Dialog>
      <Dropdown>
        <Dropdown.Trigger asChild>
          <ActionIcon variant={"subtle"}>
            <IconDots size={"75%"} />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Content className="z-[50]">
          <Dropdown.Label>Preview</Dropdown.Label>
          <Dropdown.Item icon={<IconGlobe size={16} />}>Preview</Dropdown.Item>
          <Dropdown.Item icon={<IconLayout size={16} />}>Card Preview</Dropdown.Item>
          <Dropdown.Item icon={<IconCopy size={16} />}>Copy URL</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Label>Edit</Dropdown.Label>
          <Dropdown.Item onClick={onStatus} icon={<IconUpload size={16} />}>
            {published ? "Unpublish" : "Publish"}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setDialog("rename")} icon={<IconEdit size={16} />}>
            Rename
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setDialog("delete")} icon={<IconTrash size={16} />} color="error">
            Delete
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}
