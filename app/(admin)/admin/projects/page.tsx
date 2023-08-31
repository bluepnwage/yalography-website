import { Grid } from "@/components/shared";
import { ProjectsTable } from "@/components/admin/projects/home/ProjectsTable";
import { Title } from "@aomdev/ui";
import { CreateResource } from "@/components/admin/create-resource";

export default function AdminProjectsPage() {
  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <Title order={1} className="font-heading font-medium text-4xl ">
          Projects
        </Title>
        <CreateResource type="project">Create project</CreateResource>
      </header>

      <Grid fullWidth>
        <ProjectsTable />
      </Grid>
    </>
  );
}
