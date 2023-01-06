"use client";
import { usePagination } from "@lib/hooks/usePagination";
import { Pagination } from "@components/shared/Pagination";
import { Input } from "@components/shared/Input";

import type { Tasks } from "@prisma/client";
import { Task } from "./Task";

export type SerializedTask = Omit<Tasks, "deadline" | "createdAt" | "updatedAt"> & {
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
      {paginatedList.map((task) => {
        return <Task key={task.id} taskData={task} />;
      })}
      <Pagination {...props} />
    </>
  );
}
