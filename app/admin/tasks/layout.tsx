import { FlexContainer } from "@components/shared";
import prisma from "@lib/prisma";

import { Modal } from "@components/admin/tasks/Modal";

type PropTypes = {
  children: React.ReactNode;
};

async function getCount() {
  await prisma.$connect();
  const tasks = await prisma.tasks.count();
  await prisma.$disconnect();
  return tasks;
}

export default async function Layout({ children }: PropTypes) {
  const taskCount = await getCount();
  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly items-center">
          <p>Total tasks: {taskCount}</p>

          <Modal />
        </FlexContainer>
      </div>
      {children}
    </>
  );
}
