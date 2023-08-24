import { Skeleton } from "@/components/shared";
import { Table, Badge, Title, Card } from "@aomdev/ui";

import prisma from "@/lib/prisma";

async function getIncompleteTasks() {
  await prisma.$connect();
  const tasks = await prisma.tasks.findMany({ take: 15, where: { status: false } });
  await prisma.$disconnect();
  return tasks.map(task => ({
    ...task,
    updatedAt: task.updatedAt.toDateString(),
    createdAt: task.createdAt.toDateString(),
    deadline: task?.deadline?.toDateString()
  }));
}

export async function TaskList() {
  const data = await getIncompleteTasks();
  return (
    <div className="col-span-full mt-16">
      <Title order={2} className="font-heading font-medium">
        Incomplete Tasks
      </Title>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Created</Table.Head>
            <Table.Head>Priority</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(task => {
            return (
              <Table.Row key={task.id}>
                <Table.Cell>{task.name}</Table.Cell>
                <Table.Cell>{task.createdAt}</Table.Cell>
                <Table.Cell>
                  <Badge
                    className="capitalize"
                    color={task.priority === "low" ? "primary" : task.priority === "high" ? "error" : "warn"}
                  >
                    {task.priority}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export function TaskListLoading() {
  return (
    <Card className="col-span-8 relative overflow-hidden">
      <Skeleton.Shimmer />
      <div className="flex justify-center">
        <Skeleton className="h-6 w-36" />
      </div>
      <TodoLoading />
    </Card>
  );
}

function TodoLoading() {
  const list = Array(5).fill(null);

  return (
    <>
      {list.map((_, key) => {
        return <Task key={key} />;
      })}
    </>
  );
}

function Task() {
  return (
    <div className="flex justify-between border-b -mx-4 px-4 py-4 border-gray-300 dark:border-gray-600 items-end last-of-type:border-b-0">
      <div className="space-y-2">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-10 w-24" />
    </div>
  );
}
