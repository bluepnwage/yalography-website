import { Card, Grid, Title, Anchor } from "@components/shared";
import { Table } from "@components/shared/Table";

const array = Array(9).fill(null);

export default function AdminProjectsPage() {
  const date = new Date().toDateString();
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
        <Card className="col-span-3">Total projects: 40</Card>
      </Grid>

      <Grid fullWidth>
        <div className="col-span-full">
          <Title order={"h2"}>All projects</Title>
        </div>
        <Table striped className="col-span-full">
          <thead className="border-b border-zinc-200 dark:border-zinc-700">
            <tr>
              <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Name</th>
              <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Created</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {array.map((_, key) => {
              const published = key % 2 === 0;
              return (
                <tr key={key}>
                  <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">Random title</td>
                  <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">{date}</td>
                  <td>{published ? "Published" : "Drafted"}</td>
                  <td>
                    <Anchor>View project</Anchor>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Grid>
    </>
  );
}
