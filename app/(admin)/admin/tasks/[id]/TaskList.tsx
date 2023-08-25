"use client";
import { Pagination } from "@/components/shared/Pagination";
import { FilterBar } from "@/components/admin/tasks/home/Filter";
import { Card, Badge, Checkbox, ActionIcon } from "@aomdev/ui";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { usePagination } from "@/lib/hooks/usePagination";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";
import { useState, useEffect } from "react";
import { useFilter } from "@/lib/hooks/useFilter";

import type { Tasks } from "@prisma/client";
import type { EditTaskData } from "@/components/admin/tasks/home/Tasks";
import { filterTasks } from "@/util/filterTasks";

export type SerializedTask = Omit<Tasks, "deadline" | "createdAt" | "updatedAt"> & {
  updatedAt: string;
  createdAt: string;
  deadline: string;
};

type PropTypes = {
  tasks: SerializedTask[];
};

export function TaskList({ tasks }: PropTypes) {
  const [filterOptions, toggle] = useFilter();
  const filteredTasks = filterTasks(tasks, filterOptions.sort, filterOptions.filter, filterOptions.search);
  const { paginatedList, ...props } = usePagination(10, filteredTasks);

  //Reset page when a filter or sort is applied/removed
  useEffect(() => {
    if (props.currentPage !== 1) props.onPageChange(1);
  }, [filterOptions]);

  return (
    <>
      <FilterBar
        searchValue={filterOptions.search}
        sortValue={filterOptions.sort}
        filterValue={filterOptions.filter}
        onSearchChange={toggle.onSearch}
        onClear={toggle.onClear}
        onFilterChange={toggle.onFilter}
        onSortChange={toggle.onSort}
      />
      <section>
        {paginatedList.map(task => {
          return <Task key={task.id} taskData={task} />;
        })}
        <Pagination {...props} />
      </section>
    </>
  );
}

type TaskPropTypes = {
  taskData: SerializedTask;
};

export function Task({ taskData }: TaskPropTypes) {
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const [task, setTask] = useState(taskData);
  const [lazyLoad, lazyLoadToggle] = useToggle();
  const [dialog, dialogToggle] = useToggle();

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
        refresh();
        toast.success(json.message);
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

  const onStatusToggle = async () => {
    toggle.on();
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
      const { toast } = await import("react-toastify");
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  const onEdit = (data: EditTaskData) => {
    setTask(prev => ({ ...prev, ...data }));
    refresh();
  };

  const isLoading = loading || isPending;
  return (
    <>
      <Card className={`first-of-type:mt-4  mb-5 last-of-type:mb-0 ${isLoading ? "opacity-50" : ""}`}>
        <div className="flex justify-between items-center mb-2 ">
          <div className="flex gap-2 items-center">
            <Checkbox
              onCheckedChange={onStatusToggle}
              id={`${task.id}-${task.name}`}
              checked={task.status}
              label={task.name}
            />

            <Badge
              color={
                task.priority === "high" ? "error" : task.priority === "medium" ? "secondary" : "primary"
              }
              className="capitalize"
            >
              {task.priority} priority
            </Badge>
          </div>
          <div className="flex gap-4">
            <ActionIcon
              onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}
              onClick={dialogToggle.on}
              disabled={isLoading}
              aria-label="Delete task"
            >
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon color="error" onClick={onDelete} disabled={isLoading} aria-label="Delete task">
              <IconTrash size={16} />
            </ActionIcon>
          </div>
        </div>
        <p>Due: {task.deadline}</p>
        <p className="text-gray-500 dark:text-gray-400">{task.description}</p>
      </Card>
    </>
  );
}
