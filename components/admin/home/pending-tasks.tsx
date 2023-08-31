import { getTasks } from "@/lib/admin-data";
import { Card, Table, Title, Badge, Skeleton } from "@aomdev/ui";

export async function PendingTasks() {
  const tasks = await getTasks();
  const pending = tasks.filter(task => !task.status).slice(0, 5);
  return (
    <Card>
      <Title order={2} className="font-heading font-medium text-2xl mb-6">
        Pending tasks
      </Title>
      <Table className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Priority</Table.Head>
            <Table.Head>Created</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pending.map(task => {
            return (
              <Table.Row key={task.id}>
                <Table.Cell className="capitalize">{task.name}</Table.Cell>
                <Table.Cell>
                  <Badge
                    className="capitalize"
                    color={
                      task.priority === "high" ? "error" : task.priority === "medium" ? "warn" : "primary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{task.createdAt}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Card>
  );
}

export function PendingTasksLoading() {
  const shoots = Array(5).fill(null);
  return (
    <Card className="">
      <Title order={2} className="font-heading font-medium text-2xl mb-6">
        Pending tasks
      </Title>
      <Table className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Priority</Table.Head>
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
