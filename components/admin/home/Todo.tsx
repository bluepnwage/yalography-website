"use client";
import { Button } from "@components/shared/client";
import { useState } from "react";
import { cx } from "cva";

export function Todo() {
  const [list, setList] = useState(Array(20).fill(null));
  const handleClick = (todoId: number) => {
    setList((prev) => prev.filter((_, key) => key !== todoId));
  };
  return (
    <>
      {list.length === 0 && (
        <div style={{ height: 400 }} className="flex justify-center items-center">
          <p className="text-2xl font-semibold">You don&apos;t have any tasks.</p>
        </div>
      )}
      {list.length > 0 &&
        list.map((_, key) => {
          const status = Math.random() < 0.5 ? "complete" : "not complete";
          return (
            <Task status={status} key={key}>
              <Button onClick={() => handleClick(key)} intent="secondary">
                Delete
              </Button>
            </Task>
          );
        })}
    </>
  );
}

type PropTypes = {
  children: React.ReactNode;
  status: "complete" | "not complete";
};

function Task({ children, status }: PropTypes) {
  const creationDate = new Date().toLocaleDateString();
  return (
    <div className="flex justify-between border-b -mx-4 px-4 py-2 border-gray-300 dark:border-gray-600 items-end last-of-type:border-b-0">
      <div className="space-y-4">
        <p>
          Clean photos{" "}
          <span
            className={cx(
              "bg-opacity-50 rounded-full px-2 py-1 text-sm",
              status === "complete"
                ? "text-emerald-700 dark:text-emerald-100 bg-emerald-200 dark:bg-emerald-500"
                : "text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-500"
            )}
          >
            {status === "complete" ? "Completed" : "Not Completed"}
          </span>
        </p>
        <time className="text-gray-600 dark:text-gray-400">{creationDate}</time>
      </div>
      {children}
    </div>
  );
}
