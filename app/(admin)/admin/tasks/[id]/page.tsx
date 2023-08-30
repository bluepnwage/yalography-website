import { TaskMenu } from "@/components/admin/tasks/Menu";
import { Title } from "@aomdev/ui";
import dynamic from "next/dynamic";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IconChevronRight, IconHome2 } from "@tabler/icons-react";
import { Badge } from "@aomdev/ui";
import type { SerializedTask } from "@/lib/prisma";
import { formatDate } from "@/util/formate-date";

const KanbanBoard = dynamic(() => import("@/components/admin/tasks/kanbad-board"), { ssr: false });

const findTask = async (id: number): Promise<SerializedTask> => {
  await prisma.$connect();
  const task = await prisma.tasks.findUnique({ where: { id } });
  await prisma.$disconnect();
  if (!task) notFound();
  return {
    ...task,
    createdAt: formatDate(task.createdAt),
    deadline: task.deadline ? formatDate(task.deadline) : "N/A",
    updatedAt: formatDate(task.updatedAt)
  };
};

let id = 0;

function createTask(name: string) {
  id++;
  const randomNumber = Math.random();
  return {
    id: crypto.randomUUID(),
    name,
    status: randomNumber <= 0.3 ? "inprogress" : randomNumber <= 0.6 ? "todo" : "completed",
    taskId: `${id}`,
    priority:
      randomNumber <= 0.3
        ? { color: "error", label: "High" }
        : randomNumber <= 0.6
        ? { color: "warn", label: "Medium" }
        : { color: "primary", label: "Low" }
  };
}

const dishes = createTask("Wash the dishes");
const dogs = createTask("Feed the dogs");
const windows = createTask("Open the windows");
const yalo = createTask("Finish dashboard for the weekend");
const headphones = createTask("Buy new headphones");

const alltasks = [dishes, dogs, windows, yalo, headphones];

export default async function TaskListPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (!id) notFound();
  const task = await findTask(id);
  const overdue = Date.parse(task.deadline) < Date.parse(new Date().toString());

  return (
    <>
      <div className="gap-5 flex">
        <div className="basis-4/5 ">
          <div className="border-b border-gray-700 pb-4  flex justify-between items-center">
            <div className="flex text-sm gap-4 items-center text-gray-200">
              <Link href={"/admin/"}>
                <IconHome2 size={14} className="dark:text-gray-200 hover:stroke-primary-300" />
              </Link>
              <IconChevronRight size={14} className="text-gray-200" />
              <Link href={"/admin/tasks"} className="text-gray-200 hover:text-primary-300">
                Tasks
              </Link>
              <IconChevronRight size={14} className="text-gray-200" />
              <span>{task.id}</span>
            </div>
            <TaskMenu name={task.name} id={task.id} />
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
          <KanbanBoard tasks={alltasks} />
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
      <p className="font-medium text-lg mb-8 text-gray-50">Details</p>
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
