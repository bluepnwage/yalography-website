import { MetaTags } from "@components/MetaTags";
import { findProject } from "@util/findProject";
import { notFound } from "next/navigation";

export default async function Head({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (!id) notFound();
  const project = await findProject(id);
  return (
    <>
      <title>{`Projects - ${project.title} | Yalography`}</title>
      <meta name="description" content={project.description!} />
      <MetaTags />
    </>
  );
}
