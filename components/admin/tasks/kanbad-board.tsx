"use client";
import { ActionIcon, Badge, Card } from "@aomdev/ui";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

let id = 0;

function createTask(name: string) {
  id++;
  const randomNumber = Math.random();
  return {
    id: crypto.randomUUID(),
    name,
    status: randomNumber <= 0.3 ? "inprogress" : randomNumber <= 6 ? "todo" : "completed",
    taskId: `${id}`,
    priority:
      randomNumber <= 0.3
        ? ({ color: "error", label: "High" } as const)
        : randomNumber <= 0.6
        ? ({ color: "warn", label: "Medium" } as const)
        : ({ color: "primary", label: "Low" } as const)
  };
}

const dishes = createTask("Wash the dishes");
const dogs = createTask("Feed the dogs");
const windows = createTask("Open the windows");
const yalo = createTask("Finish dashboard for the weekend");
const headphones = createTask("Buy new headphones");

const alltasks = [dishes, dogs, windows, yalo, headphones];

export default function KanbanBoard({ tasks }: { tasks: typeof alltasks }) {
  const [items, setItems] = useState(tasks);
  const [dropDestination, setDropDestination] = useState("");

  const todo = items.filter(item => item.status === "todo");
  const inProgress = items.filter(item => item.status === "inprogress");
  const completed = items.filter(item => item.status === "completed");

  return (
    <div className="grid grid-cols-3 gap-10 min-h-[500px]">
      <DragDropContext
        onDragUpdate={({ destination }) => {
          if (!destination) return;
          setDropDestination(destination?.droppableId);
        }}
        onDragEnd={({ destination, source, draggableId }) => {
          if (!destination) return;

          const item = items.find(task => task.id === draggableId);
          if (!item) return;
          const filtered = items.filter(task => task.id !== draggableId);
          const before = filtered.slice(0, destination.index);
          const after = filtered.slice(destination.index);
          setDropDestination("");
          setItems([
            ...before,
            {
              ...item,
              status: destination.droppableId
            },
            ...after
          ]);
        }}
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
                  <ActionIcon color="gray" variant={"subtle"}>
                    <IconPlus size={16} />
                  </ActionIcon>
                </div>
                {todo.map((task, index) => {
                  return (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          data-dragging={snapshot.isDragging}
                          className={`data-[dragging=true]:opacity-70`}
                        >
                          <span className="text-gray-200 text-sm block mb-1">Task #{task.taskId}</span>
                          {task.name}
                          <Badge color={task.priority.color} className="block mt-2">
                            {task.priority.label}
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
                  <ActionIcon color="gray" variant={"subtle"}>
                    <IconPlus size={16} />
                  </ActionIcon>
                </div>
                {inProgress.map((task, index) => {
                  return (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          data-dragging={snapshot.isDragging}
                          className={`data-[dragging=true]:opacity-70`}
                        >
                          <span className="text-gray-200 text-sm block mb-1">Task #{task.taskId}</span>
                          {task.name}
                          <Badge color={task.priority.color} className="block mt-2">
                            {task.priority.label}
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
                  <ActionIcon color="gray" variant={"subtle"}>
                    <IconPlus size={16} />
                  </ActionIcon>
                </div>
                {completed.map((task, index) => {
                  return (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          data-dragging={snapshot.isDragging}
                          className={`data-[dragging=true]:opacity-70`}
                        >
                          <span className="text-gray-200 text-sm block mb-1">Task #{task.taskId}</span>
                          {task.name}
                          <Badge color={task.priority.color} className="block mt-2">
                            {task.priority.label}
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
