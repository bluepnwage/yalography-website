"use client";
import { createContext, useContext } from "react";
import type { SerializedTaskList, SerializedTask } from "@/lib/prisma";

type ListJoin = SerializedTaskList & { tasks: SerializedTask[] };

type TaskContextProps = {
  tasks: SerializedTask[];
  taskLists: ListJoin[];
};

const TaskContext = createContext<TaskContextProps | null>(null);

type PropTypes = TaskContextProps & { children: React.ReactNode };

export function TaskProvider({ children, ...props }: PropTypes) {
  return <TaskContext.Provider value={props}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  return useContext(TaskContext)!;
}
