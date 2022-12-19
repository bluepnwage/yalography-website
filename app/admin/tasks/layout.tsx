import { Anchor, Button, FlexContainer } from "@components/shared";
import prisma from "@lib/prisma"

type PropTypes = {
  children: React.ReactNode;
};
export default function Layout({ children }: PropTypes) {
  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly items-center">
          <p>Total tasks: 30</p>
          <Button>Create Task</Button>
        </FlexContainer>
      </div>
      {children}
    </>
  );
}
