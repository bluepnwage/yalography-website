"use client";
import { Button } from "@components/shared/Button";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { toast } from "react-toastify";

type PropTypes = {
  pinned: boolean;
  id: number;
};

export function PinnedList({ pinned, id }: PropTypes) {
  const [loading, toggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();

  const onPin = async () => {
    toggle.on();
    try {
      const res = await fetch("/api/task-list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pinned: !pinned })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
      } else {
        throw new Error(json.message, { cause: json.error });
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
    <Button disabled={isLoading} onClick={onPin}>
      {pinned ? "Remove from pinned list" : "Add to pinned list"}
    </Button>
  );
}
