"use client";
import Link from "next/link";
import { useProjects } from "../ProjectsProvider";
import { Table, Badge } from "@aomdev/ui";

export function ProjectsTable() {
  const { drafted, published } = useProjects();
  const projects = [...drafted, ...published];
  return (
    <div className="col-span-full">
      <Table className="w-full mb-5 col-span-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Created</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map(project => {
            return (
              <Table.Row key={project.id}>
                <Table.Cell>{project.name}</Table.Cell>
                <Table.Cell>{project.createdAt}</Table.Cell>
                <Table.Cell>
                  <Badge variant={"status"} color={project.published ? "success" : "warn"}>
                    {project.published ? "Published" : "Drafted"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className={`text-yellow-600 dark:text-yellow-500`}
                    href={`/admin/projects/${project.id}`}
                  >
                    View details
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
