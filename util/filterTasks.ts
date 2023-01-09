import { SerializedTask } from "@lib/prisma";

export type SortOptions = "asc" | "desc" | "recent" | "old";
export type FilterOptions = "completed" | "in-progress" | "high" | "medium" | "low";

export function filterTasks(
  tasks: SerializedTask[],
  sort: SortOptions | null,
  filter: FilterOptions | null,
  search: string
) {
  let filteredTasks = tasks.slice();
  if (sort) {
    switch (sort) {
      case "asc": {
        filteredTasks = filteredTasks.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;
      }
      case "desc": {
        filteredTasks = filteredTasks.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
        break;
      }
      case "recent": {
        filteredTasks = filteredTasks.sort((a, b) => {
          const dateA = Date.parse(a.createdAt);
          const dateB = Date.parse(b.createdAt);
          return dateB - dateA;
        });
        break;
      }
      case "old": {
        filteredTasks = filteredTasks.sort((a, b) => {
          const dateA = Date.parse(a.createdAt);
          const dateB = Date.parse(b.createdAt);
          return dateA - dateB;
        });
        break;
      }
      default: {
        throw new Error("Sort option not valid");
      }
    }
  }
  if (filter) {
    switch (filter) {
      case "completed": {
        filteredTasks = filteredTasks.filter((task) => task.status);
        break;
      }
      case "in-progress": {
        filteredTasks = filteredTasks.filter((task) => !task.status);
        break;
      }
      case "high": {
        filteredTasks = filteredTasks.filter((task) => task.priority === "high");
        break;
      }
      case "low": {
        filteredTasks = filteredTasks.filter((task) => task.priority === "low");
        break;
      }
      case "medium": {
        filteredTasks = filteredTasks.filter((task) => task.priority === "medium");
        break;
      }

      default:
        throw new Error("Filter option not valid");
    }
  }
  if (search) {
    filteredTasks = filteredTasks.filter((task) => task.name.toLowerCase().includes(search.toLowerCase()));
  }
  return filteredTasks;
}
