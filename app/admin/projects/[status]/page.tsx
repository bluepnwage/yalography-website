import { Title } from "@components/shared";
import { ProjectsTable } from "@components/admin/projects/ProjectsTable";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ status: "drafted" }, { status: "published" }];
}

export default function BookingsPage({ params }: { params: { status: "drafted" | "published" } }) {
  return (
    <>
      <Title className="mb-10 first-letter:capitalize">{params.status} projects</Title>
      <ProjectsTable status={params.status} />
    </>
  );
}
