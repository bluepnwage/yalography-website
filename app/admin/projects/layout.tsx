import { Anchor, FlexContainer } from "@components/shared";
import { CreateProjectModal } from "@components/admin/projects/CreateProjectModal";
import { ProjectsProvider } from "@components/admin/projects/ProjectsProvider";
import prisma from "@lib/prisma";
import { cache } from "react";

const getProjects = cache(async () => {
  await prisma.$connect();
  const projects = await prisma.projects.findMany();
  await prisma.$disconnect();

  const drafted = [];
  const published = [];

  for (const project of projects) {
    //turn date into string so we dont get errors
    const date = project.createdAt.toDateString();
    if (project.published) {
      published.push({ ...project, createdAt: date });
    } else {
      drafted.push({ ...project, createdAt: date });
    }
  }
  return { drafted, published };
});

type PropTypes = {
  children: React.ReactNode;
};

export default async function Layout({ children }: PropTypes) {
  const { drafted, published } = await getProjects();
  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly">
          <div>
            <p>Drafted projects: {drafted.length}</p>
            <Anchor href={"/admin/projects/drafted"}>View drafted projects</Anchor>
          </div>
          <div>
            <p>Published projects: {published.length}</p>
            <Anchor href={"/admin/projects/published"}>View published projects</Anchor>
          </div>
          <CreateProjectModal />
        </FlexContainer>
      </div>
      <ProjectsProvider drafted={drafted} published={published}>
        {children}
      </ProjectsProvider>
    </>
  );
}
