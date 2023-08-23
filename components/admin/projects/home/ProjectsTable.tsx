"use client";
import { Table } from "@/components/shared/Table";
import Link from "next/link";
import { useProjects } from "../ProjectsProvider";
import { Badge } from "@/components/shared/Badge";

export function ProjectsTable() {
  const { drafted, published } = useProjects();
  const projects = [...drafted, ...published];
  return (
    <>
      <Table striped className="w-full mb-5 col-span-full">
        <thead className="border-b border-zinc-200 dark:border-zinc-700">
          <tr>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Name</th>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Created</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => {
            return (
              <tr key={project.id} className="text-center py-2 ">
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">{project.name}</td>
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">{project.createdAt}</td>
                <td className="py-2">
                  <Badge
                    className="inline-block mx-auto w-fit"
                    color={project.published ? "emerald" : "orange"}
                  >
                    {project.published ? "Published" : "Drafted"}
                  </Badge>
                </td>
                <td>
                  <Link
                    className={`text-yellow-600 dark:text-yellow-500`}
                    href={`/admin/projects/${project.published ? "published" : "drafted"}/${project.id}`}
                  >
                    View details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
