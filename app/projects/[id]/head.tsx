import { MetaTags } from "@components/MetaTags";
import { findProject } from "@util/findProject";

export default async function Head({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  let project;
  if (id) {
    project = await findProject(id);
  }

  return (
    <>
      <title>{`Projects - ${project?.title || "404"} | Yalography`}</title>
      <meta name="description" content={project?.description! || ""} />
      <MetaTags />
    </>
  );
}
