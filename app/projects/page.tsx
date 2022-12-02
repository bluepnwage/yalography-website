import { PageIntro } from "@components/PageIntro";
import { ProjectList, Filter } from "@components/projects";

export default function ProjectsPage() {
  return (
    <>
      <PageIntro>
        See how we deliver the <br />
        <span className="bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent">
          best photoshoots
        </span>
        <br />
        SXM has to offer
      </PageIntro>
      <Filter />
      <ProjectList />
    </>
  );
}
