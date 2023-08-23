"use client";
import { useContext, createContext } from "react";

import type { SerializedProject } from "@/lib/prisma";

type ProjectsContextProps = {
  drafted: SerializedProject[];
  published: SerializedProject[];
};

const ProjectsContext = createContext<ProjectsContextProps | null>(null);

export function ProjectsProvider({ children, ...props }: ProjectsContextProps & { children: React.ReactNode }) {
  return <ProjectsContext.Provider value={props}>{children}</ProjectsContext.Provider>;
}

export function useProjects() {
  return useContext(ProjectsContext)!;
}
