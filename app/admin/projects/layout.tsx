import { Anchor, FlexContainer } from "@components/shared";
import { Button } from "@components/shared/client";

type PropTypes = {
  children: React.ReactNode;
};

export default function Layout({ children }: PropTypes) {
  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly">
          <div>
            <p>Drafted projects: 34</p>
            <Anchor href={"/admin/projects/drafted"}>View drafted projects</Anchor>
          </div>
          <div>
            <p>Published projects: 30</p>
            <Anchor href={"/admin/projects/published"}>View published projects</Anchor>
          </div>
          <Button>Create Project</Button>
        </FlexContainer>
      </div>
      {children}
    </>
  );
}
