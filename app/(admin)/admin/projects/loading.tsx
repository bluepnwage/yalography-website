import { Grid } from "@/components/shared";

import { Title, Skeleton, Table } from "@aomdev/ui";

export default function ProjectsLoading() {
  const projects = Array(10).fill(null);
  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <Title order={1} className="font-heading font-medium text-4xl ">
          Projects
        </Title>
        <Skeleton animate className="h-8 w-28 rounded-md" />
      </header>

      <Grid fullWidth>
        <Table className="w-full mb-5 col-span-full">
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Created</Table.Head>
              <Table.Head>Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {projects.map((_, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>
                    <Skeleton rounded animate className="h-3 w-full" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton rounded animate className="h-3 w-full" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton rounded animate className="h-3 w-full" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton rounded animate className="h-3 w-full" />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Grid>
    </>
  );
}
