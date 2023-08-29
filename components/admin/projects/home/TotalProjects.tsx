"use client";
import { Card } from "@aomdev/ui";
import { useProjects } from "../ProjectsProvider";

export function TotalProjects() {
  const { drafted, published } = useProjects();
  const total = drafted.length + published.length;

  return (
    <Card className="col-span-6 ">
      <p>Total projects: {total}</p>
    </Card>
  );
}
