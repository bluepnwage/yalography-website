import { Skeleton, Title, Table } from "@aomdev/ui";

export default function TasksPageLoading() {
  const tasks = Array(10).fill(null);

  return (
    <>
      {" "}
      <header className="flex justify-between items-center mb-6">
        <Title order={1} className="font-heading font-medium text-4xl leading-none">
          Tasks
        </Title>
        <Skeleton animate className="h-8 w-28 rounded-md" />
      </header>
      <Table className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Priority</Table.Head>
            <Table.Head>Due Date</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((_, key) => {
            return (
              <Table.Row key={key} className="group">
                <Table.Cell>
                  <Skeleton className="h-3 w-full " rounded animate />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton className="h-3 w-full " rounded animate />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton className="h-3 w-full " rounded animate />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton className="h-3 w-full " rounded animate />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
