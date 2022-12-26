"use client";
import { Button } from "@components/shared/client";
import { usePagination } from "@lib/hooks/usePagination";
import { Pagination } from "@components/shared/Pagination";
import type { Tasks } from "@prisma/client";

type SerializedTask = Omit<Tasks, "deadline" | "createdAt" | "updatedAt"> & {
  updatedAt: string;
  createdAt: string;
  deadline: string;
};

type PropTypes = {
  tasks: SerializedTask[];
};

export function TaskList({ tasks }: PropTypes) {
  const { paginatedList, ...props } = usePagination(10, tasks);

  return (
    <>
      {paginatedList.map((task, key) => {
        return (
          <div key={task.id} className="bg-zinc-800 rounded-md p-4 mb-5 last-of-type:mb-0">
            <div className="flex justify-between items-center mb-2 ">
              <div className="flex items-center gap-2">
                <button aria-label="Complete task" className="rounded-full h-5 w-5 border border-gray-700"></button>
                <p>{task.name}</p>
              </div>
              <Button>Delete</Button>
            </div>
            <p>Due: {task.deadline}</p>
          </div>
        );
      })}
      <Pagination {...props} />
    </>
  );
}
