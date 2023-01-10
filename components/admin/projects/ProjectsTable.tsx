"use client";
import Link from "next/link";
import { usePagination } from "@lib/hooks/usePagination";
import { Pagination } from "@components/shared/Pagination";
import { useProjects } from "./ProjectsProvider";
import { Table } from "@components/shared/Table";

type PropTypes = {
  status: "drafted" | "published";
};

export function ProjectsTable({ status }: PropTypes) {
  const projects = useProjects()[status];
  const { paginatedList, ...props } = usePagination(10, projects);
  return (
    <>
      <Table striped className="w-full mb-5">
        <thead className="border-b border-zinc-200 dark:border-zinc-700">
          <tr>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Name</th>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Created</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedList.map((project) => {
            return (
              <tr key={project.id} className="text-center py-2 ">
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">{project.name}</td>
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">{project.createdAt}</td>
                <td className="py-2">{project.published ? "Published" : "Drafted"}</td>
                <td>
                  <Link
                    className={`text-yellow-600 dark:text-yellow-500`}
                    href={`/admin/projects/${status}/${project.id}`}
                  >
                    View details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="flex w-full justify-between">
        <Pagination {...props} />
        <p className="text-gray-100">Total items: {projects.length}</p>
      </div>
    </>
  );
}
