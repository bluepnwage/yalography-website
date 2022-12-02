"use client";
import { Button } from "@components/shared/client";

export function Todo() {
  const list = Array(20).fill(null);
  return (
    <>
      <Button className="mt-5">Add to do</Button>
      {list.map((_, key) => {
        return <Task key={key} />;
      })}
    </>
  );
}

function Task() {
  return (
    <div className="flex justify-between border-b -mx-4 px-4 py-2 border-gray-600 items-end last-of-type:border-b-0">
      <p>Clean photos</p>
      <Button intent="secondary">Delete</Button>
    </div>
  );
}
