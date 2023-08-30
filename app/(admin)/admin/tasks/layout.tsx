import prisma from "@/lib/prisma";
import { TaskProvider } from "@/components/admin/tasks/home/TasksProvider";
import { cache } from "react";
import { verifyToken } from "@/lib/firebase/admin/auth";

type PropTypes = {
  children: React.ReactNode;
};

const getTasks = cache(async () => {
  await prisma.$connect();
  const tasksPromise = prisma.tasks.findMany();
  const taskListsPromise = prisma.taskLists.findMany({ include: { tasks: true } });

  const [tasks, taskLists] = await Promise.all([tasksPromise, taskListsPromise]);
  await prisma.$disconnect();

  const serializedTasks = tasks.map(task => {
    return {
      ...task,
      createdAt: task.createdAt.toDateString(),
      updatedAt: task.updatedAt.toDateString(),
      deadline: task.deadline?.toDateString() || ""
    };
  });

  const serializedTaskList = taskLists.map(list => {
    return {
      ...list,
      createdAt: list.createdAt.toDateString(),
      updatedAt: list.updatedAt.toDateString(),
      tasks: list.tasks.map(task => ({
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

  // const { taskLists, tasks } = await getTasks();
  return (
    <>
      <TaskProvider taskLists={[]} tasks={[]}>
        {children}
      </TaskProvider>
    </>
  );
}
