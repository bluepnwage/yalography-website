"use client";
import { ActionIcon, Badge, Button, Card, Dialog, Select, TextInput, Textarea } from "@aomdev/ui";
import { IconPlus, IconX } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { SerializedSubTask } from "@/lib/prisma";
import type { DropResult } from "@hello-pangea/dnd";
type PropTypes = {
  subTasks: SerializedSubTask[];
  taskId: number;
};

export default function KanbanBoard({ subTasks, taskId }: PropTypes) {
  const [items, setItems] = useState(subTasks);
  const [dropDestination, setDropDestination] = useState("");
  const [dialog, setDialog] = useState("");

  const todo = items.filter(item => item.status === "todo");
  const inProgress = items.filter(item => item.status === "inprogress");
  const completed = items.filter(item => item.status === "completed");

  const onDrop = async ({ destination, draggableId }: DropResult) => {
    if (!destination) return;

    const item = items.find(task => `${`${task.id}`}` === draggableId);
    if (!item) return;
    const filtered = items.filter(task => `${`${task.id}`}` !== draggableId);
    const before = filtered.slice(0, destination.index);
    const after = filtered.slice(destination.index);
    const newItem = {
      ...item,
      status: destination.droppableId as SerializedSubTask["status"]
    };
    setDropDestination("");
    setItems([...before, newItem, ...after]);
    const res = await fetch("/api/sub-tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: newItem.id, status: newItem.status })
    });
    if (!res.ok) {
      setItems(items);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    e.preventDefault();
    const data = {
      name: formData.subtask_name.toString(),
      status: formData.subtask_status.toString(),
      priority: formData.subtask_priority.toString(),
      description: formData.subtask_description.toString(),
      taskId
    };
    const res = await fetch("/api/sub-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const json = await res.json();
      setItems(prev => [...prev, json.data]);
      setDialog("");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-10 min-h-[500px]">
      <Dialog open={dialog !== ""} onOpenChange={() => setDialog("")}>
        <Dialog.Content className="w-1/4">
          <div className="flex items-center justify-between">
            <Dialog.Title>Create sub task</Dialog.Title>
            <Dialog.Close>
              <IconX size="75%" />
            </Dialog.Close>
          </div>
          <form className="space-y-4 mt-6" onSubmit={onSubmit}>
            <TextInput label="Name" name="subtask_name" />
            <div className="flex gap-2">
              <div className="grow">
                <span className="text-sm font-medium block mb-1">Status</span>
                <Select
                  contentProps={{ className: "z-[9999]" }}
                  name="subtask_status"
                  fullWidth
                  defaultValue={dialog}
                  items={[
                    { label: "Todo", value: "todo" },
                    { label: "In progress", value: "inprogress" },
                    { label: "Completed", value: "completed" }
                  ]}
                />
              </div>
              <div className="grow">
                <span className="text-sm font-medium block mb-1">Priority</span>
                <Select
                  contentProps={{ className: "z-[9999]" }}
                  name="subtask_priority"
                  fullWidth
                  items={[
                    { label: "Low", value: "low" },
                    { label: "Medium", value: "Medium" },
                    { label: "High", value: "high" }
                  ]}
                />
              </div>
            </div>
            <Textarea label="Description" name="subtask_description" />
            <Button className="block ml-auto ">Submit</Button>
          </form>
        </Dialog.Content>
      </Dialog>
      <DragDropContext
        onDragUpdate={({ destination }) => {
          if (!destination) return;
          setDropDestination(destination?.droppableId);
        }}
        onDragEnd={onDrop}
      >
        <Droppable key={"todo"} droppableId="todo">
          {provided => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                data-active={dropDestination === "todo"}
                className="space-y-6 data-[active=true]:bg-white/5 p-2 rounded-sm"
              >
                <div className="flex justify-between items-center ">
                  <p>
                    <span className="rounded-full h-2 w-2 bg-warn-500 inline-block mr-2"></span>Todo
                  </p>
                  <ActionIcon onClick={() => setDialog("todo")} color="gray" variant={"subtle"}>
                    <IconPlus size={16} />
                  </ActionIcon>
                </div>
                {todo.map((task, index) => {
                  return (
                    <Draggable draggableId={`${task.id}`} index={index} key={`${task.id}`}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          data-dragging={snapshot.isDragging}
                          className={`data-[dragging=true]:opacity-70`}
                        >
                          <span className="text-gray-200 text-sm block mb-1">Task #{task.id}</span>
                          {task.name}
                          <Badge color={getPriorityColor(task.priority)} className="block mt-2 capitalize">
                            {task.priority}
                          </Badge>
                        </Card>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Droppable key={"inprogress"} droppableId="inprogress">
          {provided => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                data-active={dropDestination === "inprogress"}
                className="space-y-6 data-[active=true]:bg-white/5 p-2 rounded-sm"
              >
                <div className="flex justify-between items-center ">
                  <p>
                    <span className="rounded-full h-2 w-2 bg-tertiary-500 inline-block mr-2"></span>In
                    progress
                  </p>
                  <ActionIcon onClick={() => setDialog("inprogress")} color="gray" variant={"subtle"}>
                    <IconPlus size={16} />
                  </ActionIcon>
                </div>
                {inProgress.map((task, index) => {
                  return (
                    <Draggable draggableId={`${task.id}`} index={index} key={`${task.id}`}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          data-dragging={snapshot.isDragging}
                          className={`data-[dragging=true]:opacity-70`}
                        >
                          <span className="text-gray-200 text-sm block mb-1">Task #{task.id}</span>
                          {task.name}
                          <Badge color={getPriorityColor(task.priority)} className="block mt-2 capitalize">
                            {task.priority}
                          </Badge>
                        </Card>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Droppable key={"completed"} droppableId="completed">
          {provided => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                data-active={dropDestination === "completed"}
                className="space-y-6 data-[active=true]:bg-white/5 p-2 rounded-sm"
              >
                <div className="flex justify-between items-center">
                  <p>
                    <span className="rounded-full h-2 w-2 bg-success-500 inline-block mr-2"></span>Completed
                  </p>
                  <ActionIcon onClick={() => setDialog("completed")} color="gray" variant={"subtle"}>
                    <IconPlus size={16} />
                  </ActionIcon>
                </div>
                {completed.map((task, index) => {
                  return (
                    <Draggable draggableId={`${task.id}`} index={index} key={`${task.id}`}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          data-dragging={snapshot.isDragging}
                          className={`data-[dragging=true]:opacity-70`}
                        >
                          <span className="text-gray-200 text-sm block mb-1">Task #{task.id}</span>
                          {task.name}
                          <Badge color={getPriorityColor(task.priority)} className="block mt-2 capitalize">
                            {task.priority}
                          </Badge>
                        </Card>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

function getPriorityColor(value: string) {
  return value === "high" ? "error" : value === "medium" ? "warn" : "primary";
}
