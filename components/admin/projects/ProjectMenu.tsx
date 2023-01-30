"use client";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { Share, Trash, Pin, Unpin } from "@lib/icons";
import { useRouter } from "next/navigation";
import { ActionIcon } from "@components/shared/ActionIcon";
type PropTypes = {
  id: number;
  published: boolean;
  projectName: string;
  pinned: boolean;
};

export function ProjectMenu({ id, published, projectName, pinned }: PropTypes) {
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const router = useRouter();

  const onDelete = async () => {
    toggle.on();
    const [{ toast }, { deleteThumbnail }] = await Promise.all([
      import("react-toastify"),
      import("@lib/firebase/storage")
    ]);

    const endpoint = new URL("/api/projects", location.origin);
    endpoint.searchParams.set("revalidate", published ? "1" : "0");
    try {
      await deleteThumbnail(projectName);
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (res.ok) {
        toast.success(json.message);
        refresh();
        router.push("/admin/projects");
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

  const onShare = async () => {
    await navigator.share({ url: `${location.origin}/projects/${id}`, title: "Project" });
  };

  const onPin = async () => {
    toggle.on();
    const { toast } = await import("react-toastify");
    const endpoint = new URL("/api/projects", location.origin);
    endpoint.searchParams.set("revalidate_home", "1");
    endpoint.searchParams.set("pin", "1");
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pinned: !pinned })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        toast.success(pinned ? "Project unpinned from homepage" : "Project pinned to homepage");
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

  const isLoading = isPending || loading;

  return (
    <div className="flex gap-2 self-center h-fit">
      <ActionIcon
        className="p-1"
        disabled={isLoading}
        onClick={onPin}
        color={pinned ? "orange" : "emerald"}
        aria-label="Pin to homepage"
      >
        {pinned ? <Unpin /> : <Pin />}
      </ActionIcon>
      {published && (
        <ActionIcon aria-label="Share project" onClick={onShare} color="violet" className="p-1">
          <Share />
        </ActionIcon>
      )}
      <ActionIcon disabled={isLoading} onClick={onDelete} aria-label="Delete project" color="red" className="p-1">
        <Trash />
      </ActionIcon>
    </div>
  );
}
