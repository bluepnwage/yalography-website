"use client";
//Components
import { Table } from "@/components/shared/Table";
import { Badge } from "@/components/shared/Badge";
import { ActionIcon } from "@/components/shared/ActionIcon";
import { Edit, Trash } from "@/lib/icons";
import { FilterBar } from "./Filter";
import { Pagination } from "@/components/shared/Pagination";
import { Checkbox } from "@/components/shared/Checkbox";

//Hooks/util functions
import { cx } from "cva";
import { filterTasks } from "@/util/filterTasks";
import { useTasks } from "./TasksProvider";
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { usePagination } from "@/lib/hooks/usePagination";
import { useState, useEffect } from "react";
import { useFilter } from "@/lib/hooks/useFilter";
import dynamic from "next/dynamic";

//Types
import type { SerializedTask } from "@/lib/prisma";

const EditTaskModal = dynamic(() => import("./EditTaskModal").then(mod => mod.EditTaskModal));

export function Tasks() {
  const { tasks } = useTasks();
  const [filterOptions, toggle] = useFilter();
  const filteredTasks = filterTasks(tasks, filterOptions.sort, filterOptions.filter, filterOptions.search);
  const { paginatedList, ...props } = usePagination(10, filteredTasks);

  useEffect(() => {
    if (props.currentPage !== 1) props.onPageChange(1);
  }, [filterOptions]);

  return (
    <div className="space-y-2 col-span-8">
      <FilterBar
        searchValue={filterOptions.search}
        onSearchChange={toggle.onSearch}
        sortValue={filterOptions.sort}
        filterValue={filterOptions.filter}
        onClear={toggle.onClear}
        onFilterChange={toggle.onFilter}
        onSortChange={toggle.onSort}
      />
      <Table striped>
        <thead className="border-b border-zinc-200 dark:border-zinc-700">
          <tr>
            <th className="py-2  border-r border-zinc-200 dark:border-zinc-700">Task name</th>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Due date</th>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Status</th>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedList.map(task => {
            return <TaskRow key={task.id} taskData={task} />;
          })}
        </tbody>
      </Table>
      <Pagination {...props} />
    </div>
  );
}

type PropTypes = {
  taskData: SerializedTask;
};

export type EditTaskData = Pick<
  SerializedTask,
  "deadline" | "id" | "name" | "priority" | "description" | "groupId"
>;

function TaskRow({ taskData }: PropTypes) {
  const [loading, toggle] = useToggle();
  const [task, setTask] = useState(taskData);
  const [isPending, refresh] = useRouteRefresh();
  const [dialog, dialogToggle] = useToggle();
  const [lazyLoad, lazyLoadToggle] = useToggle();

  const onStatusToggle = async () => {
    toggle.on();
    const { toast } = await import("react-toastify");

    const lastStatus = task.status;
    setTask(prev => ({ ...prev, status: !prev.status }));
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, status: !task.status })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
      } else {
        setTask(prev => ({ ...prev, status: lastStatus }));
        throw new Error(json.message, { cause: json.error });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to update task");
      }
    } finally {
      toggle.off();
    }
  };

  const onEdit = (data: EditTaskData) => {
    setTask(prev => ({ ...prev, ...data }));
    refresh();
  };

  const onDelete = async () => {
    toggle.on();
    const { toast } = await import("react-toastify");

    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id })
      });
      const json = await res.json();
      if (res.ok) {
        toast.success(json.message);
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
    <>
      {lazyLoad && (
        <EditTaskModal onEdit={onEdit} open={dialog} onOpenChange={dialogToggle.set} task={task} />
      )}
      <tr className="border-b border-zinc-200 dark:border-zinc-700 last-of-type:border-0">
        <td className="py-2 space-x-2 flex items-center text-start pl-2 ">
          <Checkbox
            color="emerald"
            disabled={isLoading}
            onChange={onStatusToggle}
            checked={task.status}
            id={`${task.id}-${task.name}`}
          />
          <label htmlFor={`${task.id}-${task.name}`}>{task.name}</label>
        </td>
        <td className="py-2 ">{task.deadline || "N/A"}</td>
        <td className="py-2 ">
          <Badge color={task.status ? "emerald" : "orange"} className={cx("px-2 w-fit mx-auto py-1 text-sm")}>
            {task.status ? "Complete" : "Incomplete"}
          </Badge>
        </td>
        <td>
          <Badge
            color={task.priority === "high" ? "red" : task.priority === "medium" ? "yellow" : "emerald"}
            className="capitalize px-2 py-1 w-fit mx-auto text-sm"
          >
            {task.priority}
          </Badge>
        </td>
        <td className="flex gap-2 py-2 justify-center">
          <ActionIcon
            onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}
            disabled={isLoading}
            onClick={dialogToggle.on}
            color="violet"
            aria-label="Edit task list"
            className="h-7 w-7  inline"
          >
            <Edit size={16} className="stroke-violet-200" />
          </ActionIcon>
          <ActionIcon
            disabled={isLoading}
            onClick={onDelete}
            aria-label="Delete task list"
            className="h-7 w-7 inline"
          >
            <Trash size={16} className="stroke-red-200" />
          </ActionIcon>
        </td>
      </tr>
    </>
  );
}
