import { Grid } from "@/components/shared";
import { ProjectsTable } from "@/components/admin/projects/home/ProjectsTable";
import { TotalProjects } from "@/components/admin/projects/home/TotalProjects";
import { Card, Title } from "@aomdev/ui";

export default function AdminProjectsPage() {
  return (
    <>
      <Title order={1} className="font-heading font-medium text-4xl mb-6">
        Projects
      </Title>

      <Grid fullWidth className="mb-16">
        <Card className="col-span-6">
          <p className="text-lg">Share your projects with your viewers</p>
        </Card>
        <TotalProjects />
      </Grid>

      <Grid fullWidth>
        <div className="col-span-full">
          <Title order={2} className="font-medium font-heading">
            All projects
          </Title>
        </div>
        <ProjectsTable />
      </Grid>
    </>
  );
}
