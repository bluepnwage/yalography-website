import { TaskList } from "./TaskList";
import { Menu } from "@/components/admin/tasks/Menu";
import { Title } from "@aomdev/ui";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";
import Link from "next/link";
import { IconChevronRight, IconHome2 } from "@tabler/icons-react";
import { Badge } from "@aomdev/ui";

const findTaskList = cache(async (id: number) => {
  await prisma.$connect();
  const taskList = await prisma.taskLists.findUnique({ where: { id }, include: { tasks: true } });
  await prisma.$disconnect();
  if (!taskList) notFound();
  return taskList;
});

export default async function TaskListPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (!id) notFound();
  const taskList = await findTaskList(id);

  const list = taskList.tasks.map(task => {
    return {
      ...task,
      deadline: task.deadline?.toDateString() || "",
      createdAt: task.createdAt.toDateString(),
      updatedAt: task.updatedAt.toDateString()
    };
  })!;
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
              <span>5</span>
            </div>
            <Menu pinned={taskList.pinned} title={taskList.name} groupId={taskList?.id!} />
          </div>
          <div className="flex gap-4 items-center">
            <Title order={1} className="mb-6 font-heading font-medium">
              {taskList.name}
            </Title>
            {taskList.pinned ? (
              <Badge size={"lg"} color="success">
                Pinned
              </Badge>
            ) : null}
          </div>
          <TaskList tasks={list} />
        </div>
        <Sidebar />
      </div>
    </>
  );
}

function Sidebar() {
  return (
    <div className="basis-1/5 border-l border-l-gray-600 pt-14 px-4">
      <p className="font-medium text-lg mb-8 text-gray-50">Details</p>
      <ul className="space-y-4 dark:text-gray-300 mb-8 capitalize">
        <li className="flex justify-between">
          <span className="font-medium dark:text-gray-100">Status</span>{" "}
          <Badge variant={"status"} color={getStatusColor("pending")}>
            pending
          </Badge>
        </li>
        <li className="flex justify-between">
          <span className="font-medium dark:text-gray-100">Created</span> {formatDate(new Date())}
        </li>
      </ul>
    </div>
  );
}

function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
  return formatter.format(date);
}

function relativeTime(date: string) {
  const formatter = new Intl.RelativeTimeFormat("en-US", { style: "long" });
  const days = Date.parse(date) - Date.now();
  return formatter.format(Math.round(days / 1000 / 60 / 60 / 24), "days");
}

function getStatusColor(status: string) {
  return status === "approved" ? "success" : status === "pending" ? "warn" : "primary";
}
