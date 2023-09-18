"use client";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";
import { ActionIcon, Dropdown, Dialog, Button } from "@aomdev/ui";
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

type PropTypes = {
  id: number;
  published: boolean;
};

export function ProjectDropdown({ published, id }: PropTypes) {
  const [isPending, refresh] = useRouteRefresh();
  const router = useRouter();
  const [loading, toggle] = useToggle();
  const [dialog, handler] = useToggle();

  const onStatus = async () => {
    const endpoint = new URL("/api/projects", location.origin);
    endpoint.searchParams.set("revalidate", `0`);
    toggle.on();
    const { toast } = await import("react-toastify");
    const toastId = toast.loading(published ? "Drafting project..." : "Publishing project");
    try {
      //Call on save so admin woudlnt have to remember saving everytime
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published, id })
      });
      if (res.ok) {
        toast.dismiss(toastId);
        toast.success(published ? "Project drafted" : "Project published");
        refresh();
        router.push(`/admin/projects/${id}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        data: `Failed to ${published ? "draft" : "publish"} project. `
      });
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
        handler.off();
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

  const isLoading = loading || isPending;

  return (
    <>
      <Dialog open={dialog} onOpenChange={handler.set}>
        <Dialog.Content className="w-1/4 space-y-4">
          <div className="flex items-center justify-between">
            <Dialog.Title>Confirm delete</Dialog.Title>
            <Dialog.Close>
              <IconX size={16} />
            </Dialog.Close>
          </div>
          <p>This action is irreversible. Are you sure you want to proceed?</p>
          <div className="flex gap-4  justify-end">
            <Button disabled={isLoading} onClick={handler.off} variant={"neutral"}>
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
          <Dropdown.Item icon={<IconEdit size={16} />}>Rename</Dropdown.Item>
          <Dropdown.Item onClick={handler.on} icon={<IconTrash size={16} />} color="error">
            Delete
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}
