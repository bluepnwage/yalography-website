import { getProjects } from "@/lib/admin-data";
import { Card, Skeleton, Table, Title } from "@aomdev/ui";

export async function PendingProjects() {
  const projects = await getProjects();
  const pending = projects.filter(project => !project.published).slice(0, 5);
  return (
    <Card>
      <Title order={2} className="font-heading font-medium text-2xl mb-6">
        Pending projects
      </Title>
      <Table className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>Created</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pending.map(project => {
            return (
              <Table.Row key={project.id}>
                <Table.Cell className="capitalize">{project.name}</Table.Cell>
                <Table.Cell className="capitalize">{project.type}</Table.Cell>
                <Table.Cell>{project.createdAt}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Card>
  );
}

export function PendingProjectsLoading() {
  const shoots = Array(5).fill(null);
  return (
    <Card className="">
      <Title order={2} className="font-heading font-medium text-2xl mb-6">
        Pending projects
      </Title>
      <Table className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>Created</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {shoots.map((_, key) => {
            return (
              <Table.Row key={key}>
                <Table.Cell className="capitalize">
                  <Skeleton animate rounded className="w-full h-4" />
                </Table.Cell>
                <Table.Cell className="capitalize">
                  <Skeleton animate rounded className="w-full h-4" />
                </Table.Cell>
                <Table.Cell className="capitalize">
                  <Skeleton animate rounded className="w-full h-4" />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Card>
  );
}
