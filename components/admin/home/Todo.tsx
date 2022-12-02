import { Card, Button, Title } from "@components/shared";

const list = Array(20).fill(null);

export function Todo() {
  return (
    <Card style={{ maxHeight: "540px" }} className="col-span-8 overflow-y-scroll">
      <Title order={"h3"}>Tasks</Title>
      {list.map((_, key) => {
        return <Task key={key} />;
      })}
    </Card>
  );
}

function Task() {
  return (
    <div className="flex justify-between border-b -mx-4 px-4 py-2 border-gray-600 items-end last-of-type:border-b-0">
      <p>Clean photos</p>
      <Button>Delete</Button>
    </div>
  );
}
