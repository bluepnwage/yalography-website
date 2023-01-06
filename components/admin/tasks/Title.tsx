"use client";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type PropTypes = {
  title: string;
  id: number;
};
export function TaskTitle({ title, id }: PropTypes) {
  const [listTitle, setListTitle] = useState(title);
  const [value] = useDebouncedValue(listTitle, 1000 * 3);
  const [isFirstMount, toggleMount] = useToggle(true);
  const [, refresh] = useRouteRefresh();
  useEffect(() => {
    toggleMount.off();
  }, []);

  useEffect(() => {
    if (isFirstMount || value === title) return;
    onChange().catch((e) => toast.error(e.message));
  }, [value]);

  const onChange = async () => {
    const res = await fetch("/api/task-list", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name: value })
    });
    if (!res.ok) {
      throw new Error("Failed to update task list name");
    } else {
      refresh();
    }
  };
  return (
    <input
      className="font-bold text-6xl w-fit bg-gray-100 appearance-none outline-none dark:bg-zinc-900"
      value={listTitle}
      onChange={(e) => setListTitle(e.currentTarget.value)}
    />
  );
}
