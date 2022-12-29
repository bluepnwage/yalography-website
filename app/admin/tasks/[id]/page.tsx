import { Title, FlexContainer, Breadcrumbs, Anchor } from "@components/shared";
import { Menu } from "./Menu";
import { TaskList } from "./TaskList";
import prisma from "@lib/prisma";

async function findTaskList(id: number) {
  await prisma.$connect();
  const taskList = await prisma.taskLists.findUnique({ where: { id }, include: { tasks: true } });
  await prisma.$disconnect();
  return taskList;
}

export default async function TaskListPage({ params }: { params: { id: string } }) {
  const taskList = await findTaskList(parseInt(params.id));

  const list = taskList?.tasks.map((task) => {
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
        <Title>{taskList?.name}</Title>
        <Menu groupId={taskList?.id!} />
      </FlexContainer>
      <TaskList tasks={list} />
    </>
  );
}
