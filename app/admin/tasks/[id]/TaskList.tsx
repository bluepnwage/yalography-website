"use client";
import { Button } from "@components/shared/client";
import { usePagination } from "@lib/hooks/usePagination";
import { Pagination } from "@components/shared/Pagination";
const tasks = Array(40).fill(null);

export function TaskList() {
  const { paginatedList, ...props } = usePagination(10, tasks);
  return (
    <>
      {paginatedList.map((_, key) => {
        const date = new Date().toDateString();
        return (
          <div key={key} className="bg-zinc-800 rounded-md p-4 mb-5 last-of-type:mb-0">
            <div className="flex justify-between items-center mb-2 ">
              <div className="flex items-center gap-2">
                <button aria-label="Complete task" className="rounded-full h-5 w-5 border border-gray-700"></button>
                <p>Eat food</p>
              </div>
              <Button>Delete</Button>
            </div>
            <p>Due: {date}</p>
          </div>
        );
      })}
      <Pagination {...props} />
    </>
  );
}
