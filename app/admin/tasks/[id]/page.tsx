import { FlexContainer, Breadcrumbs, Anchor } from "@components/shared";
import { Menu } from "./Menu";
import { TaskList } from "./TaskList";
import { TaskTitle } from "@components/admin/tasks/Title";

import prisma from "@lib/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";

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

  const list = taskList.tasks.map((task) => {
    return {
      ...task,
      deadline: task.deadline?.toDateString() || "",
      createdAt: task.createdAt.toDateString(),
      updatedAt: task.updatedAt.toDateString()
    };
  })!;
  return (
    <>
      <Breadcrumbs>
        <Anchor href="/admin/tasks">Tasks</Anchor>
        <Anchor href={`/admin/tasks/${params.id}`}>{taskList?.name}</Anchor>
      </Breadcrumbs>
      <FlexContainer className="justify-between mb-20 mt-5">
        <TaskTitle id={taskList.id} title={taskList.name} />
        <Menu pinned={taskList.pinned} groupId={taskList?.id!} />
      </FlexContainer>
      <TaskList tasks={list} />
    </>
  );
}
