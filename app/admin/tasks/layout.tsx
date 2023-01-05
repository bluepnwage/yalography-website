import { FlexContainer } from "@components/shared";
import prisma from "@lib/prisma";
import { TaskProvider } from "@components/admin/tasks/home/TasksProvider";
import { Modal } from "@components/admin/tasks/home/Modal";

type PropTypes = {
  children: React.ReactNode;
};

async function getTasks() {
  await prisma.$connect();
  const tasksPromise = prisma.tasks.findMany();
  const taskListsPromise = prisma.taskLists.findMany({ include: { tasks: true } });

  const [tasks, taskLists] = await Promise.all([tasksPromise, taskListsPromise]);

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

  await prisma.$disconnect();
  return { tasks: serializedTasks, taskLists: serializedTaskList };
}

export default async function Layout({ children }: PropTypes) {
  const { taskLists, tasks } = await getTasks();
  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly items-center">
          <p>Total tasks: {tasks.length}</p>

          <Modal taskLists={taskLists} />
        </FlexContainer>
      </div>
      <TaskProvider taskLists={taskLists} tasks={tasks}>
        {children}
      </TaskProvider>
    </>
  );
}
