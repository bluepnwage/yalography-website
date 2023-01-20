import { FlexContainer } from "@components/shared";
import prisma from "@lib/prisma";
import { TaskProvider } from "@components/admin/tasks/home/TasksProvider";
import { CreateTaskModal } from "@components/admin/tasks/home/CreateTaskModal";
import { cache } from "react";
import { verifyToken } from "@lib/firebase/admin/auth";

type PropTypes = {
  children: React.ReactNode;
};

const getTasks = cache(async () => {
  await prisma.$connect();
  const tasksPromise = prisma.tasks.findMany();
  const taskListsPromise = prisma.taskLists.findMany({ include: { tasks: true } });

  const [tasks, taskLists] = await Promise.all([tasksPromise, taskListsPromise]);
  await prisma.$disconnect();

  const serializedTasks = tasks.map((task) => {
    return {
      ...task,
      createdAt: task.createdAt.toDateString(),
      updatedAt: task.updatedAt.toDateString(),
      deadline: task.deadline?.toDateString() || ""
    };
  });

  const serializedTaskList = taskLists.map((list) => {
    return {
      ...list,
      createdAt: list.createdAt.toDateString(),
      updatedAt: list.updatedAt.toDateString(),
      tasks: list.tasks.map((task) => ({
        ...task,
        createdAt: task.createdAt.toDateString(),
        deadline: task.deadline?.toDateString() || "",
        updatedAt: task.updatedAt.toDateString()
      }))
    };
  });

  return { tasks: serializedTasks, taskLists: serializedTaskList };
});

export default async function Layout({ children }: PropTypes) {
  await verifyToken();

  const { taskLists, tasks } = await getTasks();
  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly items-center">
          <p>Total tasks: {tasks.length}</p>

          <CreateTaskModal taskLists={taskLists} />
        </FlexContainer>
      </div>
      <TaskProvider taskLists={taskLists} tasks={tasks}>
        {children}
      </TaskProvider>
    </>
  );
}
