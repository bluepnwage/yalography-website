import { TaskMenu } from "@/components/admin/tasks/Menu";
import { Title } from "@aomdev/ui";
import dynamic from "next/dynamic";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IconChevronRight, IconHome2 } from "@tabler/icons-react";
import { Badge } from "@aomdev/ui";
import type { SerializedSubTask, SerializedTask } from "@/lib/prisma";
import { formatDate } from "@/util/formate-date";

const KanbanBoard = dynamic(() => import("@/components/admin/tasks/kanban-board"), { ssr: false });

const findTask = async (id: number): Promise<SerializedTask & { subTasks: SerializedSubTask[] }> => {
  const task = await prisma.tasks.findUnique({ where: { id }, include: { subTasks: true } });

  if (!task) notFound();
  return {
    ...task,
    createdAt: formatDate(task.createdAt),
    deadline: task.deadline ? formatDate(task.deadline) : "N/A",
    updatedAt: formatDate(task.updatedAt),
    subTasks: task.subTasks.map(subTask => ({ ...subTask, createdAt: formatDate(subTask.createdAt) }))
  };
};

export default async function TaskListPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (!id) notFound();
  const task = await findTask(id);
  const overdue = Date.parse(task.deadline) < Date.parse(new Date().toString());

  return (
    <>
      <div className="gap-5 flex">
        <div className="basis-4/5 ">
          <div className="border-b border-gray-200 dark:border-gray-700 flex justify-between pb-4">
            <div className="flex text-sm gap-4 items-center text-gray-500 dark:text-gray-200">
              <Link href={"/admin/"}>
                <IconHome2 size={14} className="dark:text-gray-200 hover:stroke-primary-300" />
              </Link>
              <IconChevronRight size={14} className="text-gray-500 dark:text-gray-200" />
              <Link href={"/admin/tasks"} className="text-gray-500 dark:text-gray-200 hover:text-primary-300">
                Tasks
              </Link>
              <IconChevronRight size={14} className="text-gray-500 dark:text-gray-200" />
              <span>{task.id}</span>
            </div>
            <TaskMenu defaultPinned={task.pinned} name={task.name} id={task.id} />
          </div>
          <div className="flex gap-4 items-center mb-6 mt-6">
            <header>
              <Title order={1} className=" font-heading font-medium text-4xl leading-none">
                {task.name}
              </Title>
              <span className="text-gray-200 text-lg mt-2 block">{task.description}</span>
            </header>
            {overdue && <Badge color="error">Overdue</Badge>}
          </div>
          <KanbanBoard subTasks={task.subTasks} taskId={task.id} />
        </div>
        <Sidebar task={task} />
      </div>
    </>
  );
}

type PropTypes = {
  task: SerializedTask;
};

function Sidebar({ task }: PropTypes) {
  return (
    <div className="basis-1/5 border-l border-l-gray-600 pt-14 px-4">
      <p className="font-medium text-lg mb-8 text-gray-900 dark:text-gray-50">Details</p>
      <ul className="space-y-4 dark:text-gray-300 mb-8 capitalize">
        <li className="flex justify-between">
          <span className="font-medium dark:text-gray-100">Status</span>{" "}
          <Badge variant={"status"} color={task.status ? "success" : "warn"}>
            {task.status ? "Completed" : "Incomplete"}
          </Badge>
        </li>
        <li className="flex justify-between">
          <span className="font-medium dark:text-gray-100">Priority</span>{" "}
          <Badge color={task.priority === "high" ? "error" : task.priority === "medium" ? "warn" : "primary"}>
            {task.priority}
          </Badge>
        </li>

        <li className="flex justify-between">
          <span className="font-medium dark:text-gray-100">Deadline</span> {task.deadline}
        </li>
      </ul>
    </div>
  );
}
