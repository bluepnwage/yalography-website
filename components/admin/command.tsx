"use client";
import { Command, ScrollArea } from "@aomdev/ui";
import { useEffect, useState } from "react";
import { useHotkeys } from "@mantine/hooks";
import {
  IconListCheck,
  IconLayoutBottombar,
  IconClipboardData,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconHome,
  IconChevronRight,
  IconChevronUp
} from "@tabler/icons-react";
import { BookingDialog } from "./bookings-dialog";
import { GalleryDialog } from "./gallery-dialog";
import { ProjectDialog } from "./project-dialog";
import { TaskDialog } from "./task-dialog";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import { ActionIcon } from "@aomdev/ui";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Badge } from "@aomdev/ui";
import { useCommand } from "./command-provider";

import type { SerializedTask, SerializedBooking, SerializedProject } from "@/lib/prisma";

type PropTypes = {
  projects: SerializedProject[];
  bookings: SerializedBooking[];
  tasks: SerializedTask[];
};

export function AdminCommand({ bookings, projects, tasks }: PropTypes) {
  const { dispatch, state } = useCommand();
  useHotkeys([["ctrl+k", () => dispatch({ payload: true, type: "command" })]]);
  useEffect(() => {
    const onBackspace = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        dispatch({ type: "page", payload: "home" });
      }
    };
    window.addEventListener("keydown", onBackspace);
    return () => {
      window.removeEventListener("keydown", onBackspace);
    };
  }, []);

  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch({ type: "command", payload: true })}
          className={inputStyles({
            className: "basis-3/4 grow flex justify-between items-center px-2",
            size: "sm"
          })}
        >
          <span>
            <IconSearch size={16} className="inline-block mr-2" />
            Search...
          </span>
          <kbd className="text-xs bg-neutral-200/30 dark:bg-neutral-600/30 ring-1 ring-neutral-100 dark:ring-neutral-700 inline-block ml-6 p-[1px] rounded-sm">
            Ctrl K
          </kbd>
        </button>
        <ActionIcon
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          size={"lg"}
          className="rounded"
        >
          <IconMoonStars size={"75%"} className="hidden dark:inline-block" />
          <IconSun size={"75%"} className="dark:hidden inline-block" />
        </ActionIcon>
      </div>
      <BookingDialog
        open={state.bookings}
        onOpenChange={payload => dispatch({ payload, type: "bookings" })}
      />
      <GalleryDialog
        environment="dev"
        folders={[]}
        dialogProps={{ open: state.photo, onOpenChange: payload => dispatch({ payload, type: "photo" }) }}
      />
      <ProjectDialog open={state.project} onOpenChange={payload => dispatch({ payload, type: "project" })} />
      <TaskDialog
        list={state.list}
        taskLists={[]}
        dialogProps={{
          open: state.task,
          onOpenChange: payload => dispatch({ payload: { value: payload, list: false }, type: "task" })
        }}
      />
      <Command
        open={state.command}
        onOpenChange={payload => dispatch({ payload, type: "command" })}
        contentProps={{ className: "w-2/4 relative pb-6", blur: true }}
      >
        <Command.Input />
        <div className=" flex justify-between px-4 mb-2">
          <div className="flex text-sm gap-4 items-center text-gray-500 dark:text-gray-200">
            <div>
              <IconHome size={14} className="dark:text-gray-200 hover:stroke-primary-300" />
            </div>
            {state.page !== "home" && (
              <>
                <IconChevronRight size={14} className="dark:text-gray-200" />
                <div className=" dark:text-gray-200 hover:text-primary-300 capitalize">{state.page}</div>
              </>
            )}
          </div>
        </div>
        <Command.List>
          <ScrollArea style={{ height: 500 }}>
            {state.page === "home" && <CommandHome />}
            {state.page === "projects" && <CommandProjects projects={projects} />}
            {state.page === "bookings" && <CommandBookings bookings={bookings} />}
            {state.page === "tasks" && <CommandTasks tasks={tasks} />}
          </ScrollArea>
          <div
            className={`absolute bg-white dark:bg-neutral-800 px-4 text-sm dark:text-gray-300 text-gray-500 flex items-center justify-between bottom-0 left-0 
        h-10 border-t w-full border-t-neutral-100 dark:border-t-neutral-700`}
          >
            <div className="flex gap-6 items-center">
              <span className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <kbd className="text-xs bg-neutral-200/30 ring-1 ring-neutral-100 dark:bg-neutral-600/30 dark:ring-neutral-700 inline-block  p-[1px] rounded-sm">
                    <IconChevronUp size={16} />
                  </kbd>
                  <kbd className="text-xs rotate-180 bg-neutral-200/30 ring-1 ring-neutral-100 dark:bg-neutral-600/30 dark:ring-neutral-700 inline-block  p-[1px] rounded-sm">
                    <IconChevronUp size={16} />
                  </kbd>
                </span>
                <span className="font-medium ">Navigate</span>
              </span>
              <span className="flex items-center gap-2">
                <kbd className="text-sm bg-neutral-200/30 ring-1 ring-neutral-100 dark:bg-neutral-600/30 dark:ring-neutral-700 inline-block  p-[1px] rounded-sm">
                  esc
                </kbd>
                <span className="font-medium ">Close</span>
              </span>
              <span>
                <kbd className="text-xs bg-neutral-200/30 ring-1 ring-neutral-100 dark:bg-neutral-600/30 dark:ring-neutral-700 inline-block  p-[1px] rounded-sm">
                  CTRL /
                </kbd>{" "}
                <span className="font-medium">Back </span>
              </span>
            </div>
          </div>
        </Command.List>
      </Command>
    </>
  );
}

function CommandHome() {
  const { dispatch } = useCommand();

  const onRefresh = async () => {
    const { toast } = await import("react-toastify");
    const endpoint = new URL("/api/revalidate-gallery", window.location.origin);
    endpoint.searchParams.set("secret", process.env.NEXT_PUBLIC_REVALIDATE_SECRET);
    const res = await fetch(endpoint);
    if (res.ok) {
      toast.success("Gallery refreshed!");
    }
  };

  return (
    <>
      <Command.Group heading="Bookings">
        <Command.Item onSelect={() => dispatch({ payload: "bookings", type: "page" })}>
          <IconClipboardData size={18} className="inline-block mr-2 text-gray-600 dark:text-gray-300" />{" "}
          Search Bookings...
        </Command.Item>
        <Command.Item onSelect={() => dispatch({ type: "bookings", payload: true })}>
          {" "}
          <IconPlus size={18} className="inline-block mr-2 text-gray-600 dark:text-gray-300" /> Create
          Booking...
        </Command.Item>
      </Command.Group>
      <Command.Seperator />
      <Command.Group heading="Tasks">
        <Command.Item onSelect={() => dispatch({ payload: "tasks", type: "page" })}>
          {" "}
          <IconListCheck size={18} className="inline-block mr-2 text-gray-600 dark:text-gray-300" />
          Search Tasks...
        </Command.Item>
        <Command.Item onSelect={() => dispatch({ payload: { value: true, list: false }, type: "task" })}>
          {" "}
          <IconPlus size={18} className="inline-block mr-2 text-gray-600 dark:text-gray-300" />
          Create Task...
        </Command.Item>
        <Command.Item onSelect={() => dispatch({ payload: { value: true, list: true }, type: "task" })}>
          {" "}
          <IconPlus size={18} className="inline-block mr-2 text-gray-600 dark:text-gray-300" />
          Create Task List...
        </Command.Item>
      </Command.Group>
      <Command.Seperator />
      <Command.Group heading="Gallery">
        <Command.Item onSelect={onRefresh}>
          <IconRefresh size={18} className="inline-block mr-2 text-gray-600 dark:text-gray-300" />
          Refresh Gallery...
        </Command.Item>
        <Command.Item onSelect={() => dispatch({ payload: true, type: "photo" })}>
          {" "}
          <IconPlus size={18} className="inline-block mr-2 text-gray-600 dark:text-gray-300" />
          Upload Image...
        </Command.Item>
      </Command.Group>
      <Command.Seperator />
      <Command.Group heading="Projects">
        <Command.Item onSelect={() => dispatch({ payload: "projects", type: "page" })}>
          {" "}
          <IconLayoutBottombar
            size={18}
            className="inline-block mr-2 text-gray-600 dark:text-gray-300"
          />{" "}
          Search Projects...
        </Command.Item>
        <Command.Item onSelect={() => dispatch({ payload: true, type: "project" })}>
          {" "}
          <IconPlus size={18} className="inline-block mr-2 text-gray-600 dark:text-gray-300" /> Create
          Project...
        </Command.Item>
      </Command.Group>
    </>
  );
}

function CommandProjects({ projects }: { projects: PropTypes["projects"] }) {
  const { onSelect } = useCommand();
  return (
    <>
      {projects.map(project => {
        return (
          <Command.Item value={`projects/${project.id}`} onSelect={onSelect} key={project.id}>
            <div className="flex items-center justify-between">
              {project.name}
              <Badge variant={"status"} color={project.published ? "success" : "warn"}>
                {project.published ? "Published" : "Drafted"}
              </Badge>
            </div>
          </Command.Item>
        );
      })}
    </>
  );
}

function CommandBookings({ bookings }: { bookings: PropTypes["bookings"] }) {
  const { onSelect } = useCommand();
  return (
    <>
      {bookings.map(booking => {
        return (
          <Command.Item value={`bookings/${booking.id}`} onSelect={onSelect} key={booking.id}>
            <div className="flex items-center justify-between">
              {booking.type}
              <Badge variant={"status"} color={booking.status === "approved" ? "success" : "warn"}>
                {booking.status}
              </Badge>
            </div>
          </Command.Item>
        );
      })}
    </>
  );
}

function CommandTasks({ tasks }: { tasks: PropTypes["tasks"] }) {
  const { onSelect } = useCommand();
  return (
    <>
      {tasks.map(task => {
        <Command.Item value={`tasks`} onSelect={onSelect} key={task.id}>
          <div className="flex items-center justify-between">
            {task.name}
            <Badge variant={"status"} color={task.status ? "success" : "warn"}>
              {task.status ? "Completed" : "Incomplete"}
            </Badge>
          </div>
        </Command.Item>;
      })}
    </>
  );
}
