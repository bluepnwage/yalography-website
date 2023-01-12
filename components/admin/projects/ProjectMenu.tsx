"use client";

import { Dropdown } from "@components/shared/Dropdown";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { DotsVertical, Trash } from "@lib/icons";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type PropTypes = {
  id: number;
  published: boolean;
};

export function ProjectMenu({ id, published }: PropTypes) {
  const [, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const router = useRouter();

  const onDelete = async () => {
    toggle.on();
    const endpoint = new URL("/api/projects", location.origin);
    endpoint.searchParams.set("revalidate", published ? "1" : "0");
    try {
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

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <button
          aria-label="Open menu"
          className="bg-zinc-200 dark:bg-zinc-700 rounded-full h-7 w-7 flex justify-center items-center"
        >
          <DotsVertical className="stroke-gray-800 dark:stroke-white" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Share</Dropdown.Item>
        <Dropdown.Item>Copy link</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>
          <Trash className="stroke-yellow-600 dark:stroke-yellow-500 inline-block mr-2" size={16} />
          Delete
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
