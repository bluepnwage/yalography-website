"use client";
//Components
import { FilterBar } from "./Filter";
import { Pagination } from "@/components/shared/Pagination";
import { Badge, Table, ActionIcon, Checkbox, Dialog, TextInput, Select, Textarea, Button } from "@aomdev/ui";
import { IconTrash, IconEdit, IconX } from "@tabler/icons-react";

//Hooks/util functions
import { cx } from "cva";
import { filterTasks } from "@/util/filterTasks";
import { useTasks } from "./TasksProvider";
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { usePagination } from "@/lib/hooks/usePagination";
import { useState, useEffect, FormEvent } from "react";
import { useFilter } from "@/lib/hooks/useFilter";
import dynamic from "next/dynamic";

//Types
import type { SerializedTask } from "@/lib/prisma";

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
      <Table>
        <Table.Header className="border-b border-zinc-200 dark:border-zinc-700">
          <Table.Row>
            <Table.Head>Task name</Table.Head>
            <Table.Head>Due date</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Priority</Table.Head>
            <Table.Head>Action</Table.Head>
          </Table.Row>
        </Table.Header>
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
  const { taskLists } = useTasks();

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const data = {
      id: task.id,
      name: formData.task_name.toString(),
      description: formData.task_description.toString(),
      priority: formData.task_priority.toString() as any
    };
    e.preventDefault();
    setTask(prev => ({
      ...prev,
      ...data
    }));
    const { toast } = await import("react-toastify");

    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
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
      dialogToggle.off();
    }
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
  const items = taskLists.map(list => ({ label: list.name, value: `${list.id}` }));

  return (
    <>
      {/* {lazyLoad && (
        <EditTaskModal onEdit={onEdit} open={dialog} onOpenChange={dialogToggle.set} task={task} />
      )} */}
      <Dialog open={dialog} onOpenChange={dialogToggle.set}>
        <Dialog.Content className="w-1/4">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title>Edit task</Dialog.Title>
            <Dialog.Close>
              <IconX />
            </Dialog.Close>
          </div>
          <form className="space-y-4" onSubmit={onSubmit}>
            <TextInput defaultValue={task.name} label="Name" name="task_name" id="task_name" />
            <div className="flex gap-5">
              <div className="space-y-1 grow">
                <span className="text-sm font-medium block text-gray-100">Add to task list</span>
                <Select
                  fullWidth
                  name="task_list"
                  defaultValue={task.groupId ? `${task.groupId}` : undefined}
                  items={items}
                />
              </div>
              <div className="grow space-y-1">
                <span className="text-sm font-medium block text-gray-100">Priority</span>
                <Select
                  fullWidth
                  defaultValue={task.priority}
                  name="task_priority"
                  items={[
                    { label: "High", value: "high" },
                    { label: "Medium", value: "medium" },
                    { label: "Low", value: "low" }
                  ]}
                />
              </div>
            </div>
            <Textarea name="task_description" label="Description" />
            <Button className="ml-auto block">Edit</Button>
          </form>
        </Dialog.Content>
      </Dialog>
      <Table.Row>
        <Table.Cell>
          <Checkbox
            checked={task.status}
            disabled={isLoading}
            onCheckedChange={onStatusToggle}
            id={`${task.id}-${task.name}`}
            label={task.name}
          />
        </Table.Cell>
        <Table.Cell>{task.deadline || "N/A"}</Table.Cell>
        <Table.Cell>
          <Badge
            variant={"status"}
            color={task.status ? "success" : "warn"}
            className={cx("px-2 w-fit mx-auto py-1 text-sm")}
          >
            {task.status ? "Complete" : "Incomplete"}
          </Badge>
        </Table.Cell>
        <Table.Cell>
          <Badge
            color={task.priority === "high" ? "error" : task.priority === "medium" ? "secondary" : "success"}
            className="capitalize px-2 py-1 w-fit mx-auto text-sm"
          >
            {task.priority}
          </Badge>
        </Table.Cell>
        <Table.Cell>
          <span className="flex gap-2">
            <ActionIcon
              onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}
              disabled={isLoading}
              onClick={dialogToggle.on}
              color="primary"
              aria-label="Edit task list"
            >
              <IconEdit size={"75%"} />
            </ActionIcon>
            <ActionIcon disabled={isLoading} onClick={onDelete} aria-label="Delete task list" color="error">
              <IconTrash size={"75%"} />
            </ActionIcon>
          </span>
        </Table.Cell>
      </Table.Row>
    </>
  );
}
