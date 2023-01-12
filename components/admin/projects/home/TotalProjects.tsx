"use client";
import { useProjects } from "../ProjectsProvider";

export function TotalProjects() {
  const { drafted, published } = useProjects();
  const total = drafted.length + published.length;

  return (
    <div className="rounded-md p-4 col-span-6 bg-white dark:bg-zinc-800">
      <p>Total projects: {total}</p>
    </div>
  );
}
