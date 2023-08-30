import { Table, Title, Badge, Button } from "@aomdev/ui";
import { cache } from "react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/util/formate-date";
import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";

export const revalidate = 0;
const getTasks = cache(async () => {
  await prisma.$connect();
  const tasks = await prisma.tasks.findMany();

  await prisma.$disconnect();

  return tasks.map(task => {
    return {
      ...task,
      createdAt: formatDate(task.createdAt),
      updatedAt: formatDate(task.updatedAt),
      deadline: task.deadline ? formatDate(task.deadline) : ""
    };
  });
});

export default async function TasksPage() {
  const tasks = await getTasks();

  const pendingTasks = [];
  const completedTasks = [];

  for (const task of tasks) {
    if (task.status) {
      completedTasks.push(task);
    } else {
      pendingTasks.push(task);
    }
  }

  return (
    <>
      <Title order={1} className="font-heading font-medium text-4xl leading-none mb-6">
        Tasks
      </Title>
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
          {tasks.map(task => {
            return (
              <Table.Row key={task.id} className="group">
                <Table.Cell className="relative group flex gap-4 items-center">
                  {task.name}
                  <Link
                    href={`/admin/tasks/${task.id}`}
                    className={buttonStyles({
                      size: "sm",
                      variant: "neutral",
                      className: "inline-block opacity-0 group-hover:opacity-100 w-fit"
                    })}
                  >
                    Open
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={"status"}
                    color={task.status ? "success" : "warn"}
                    className={"px-2 w-fit mx-auto py-1 text-sm"}
                  >
                    {task.status ? "Complete" : "Incomplete"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    color={
                      task.priority === "high"
                        ? "error"
                        : task.priority === "medium"
                        ? "secondary"
                        : "success"
                    }
                    className="capitalize px-2 py-1 w-fit mx-auto text-sm"
                  >
                    {task.priority}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{task.deadline ? task.deadline : "N/A"}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Caption style={{ captionSide: "bottom" }}>
          <div>
            <span>
              <span className="font-semibold">{pendingTasks.length}</span> Pending Tasks
            </span>
          </div>
        </Table.Caption>
      </Table>
    </>
  );
}
