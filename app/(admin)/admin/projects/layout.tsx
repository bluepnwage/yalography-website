import { ProjectsProvider } from "@/components/admin/projects/ProjectsProvider";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { verifyToken } from "@/lib/firebase/admin/auth";

const getProjects = cache(async () => {
  const projects = await prisma.projects.findMany();

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
  await verifyToken();
  const { drafted, published } = await getProjects();
  return (
    <>
      <ProjectsProvider drafted={drafted} published={published}>
        {children}
      </ProjectsProvider>
    </>
  );
}
