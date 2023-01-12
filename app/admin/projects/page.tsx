import { Card, Grid, Title, Anchor } from "@components/shared";
import { ProjectsTable } from "@components/admin/projects/home/ProjectsTable";
import { TotalProjects } from "@components/admin/projects/home/TotalProjects";

export default function AdminProjectsPage() {
  return (
    <>
      <Title order={"h1"} className="mb-5">
        Projects
      </Title>

      <Grid fullWidth className="mb-16">
        <Card className="col-span-6">
          <p className="text-lg">Share your projects with your viewers</p>
        </Card>
        <Card className="col-span-3">Total views: 6</Card>
        <TotalProjects />
      </Grid>

      <Grid fullWidth>
        <div className="col-span-full">
          <Title order={"h2"}>All projects</Title>
        </div>
        <ProjectsTable />
      </Grid>
    </>
  );
}
