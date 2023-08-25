"use client";
import { Command, ScrollArea } from "@aomdev/ui";
import { useReducer } from "react";
import { useHotkeys } from "@mantine/hooks";
import {
  IconListCheck,
  IconLayoutBottombar,
  IconClipboardData,
  IconPlus,
  IconRefresh,
  IconSearch
} from "@tabler/icons-react";
import { initialState, reducer } from "./command-reducer";
import { BookingDialog } from "./bookings-dialog";
import { GalleryDialog } from "./gallery-dialog";
import { ProjectDialog } from "./project-dialog";
import { TaskDialog } from "./task-dialog";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import { ActionIcon } from "@aomdev/ui";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export function AdminCommand() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useHotkeys([["ctrl+k", () => dispatch({ payload: true, type: "command" })]]);
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
        contentProps={{ className: "w-2/4" }}
      >
        <Command.Input />
        <Command.List>
          <ScrollArea style={{ height: 500 }}>
            <Command.Group heading="Bookings">
              <Command.Item>
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
              <Command.Item>
                {" "}
                <IconListCheck size={18} className="inline-block mr-2 text-gray-600 dark:text-gray-300" />
                Search Tasks...
              </Command.Item>
              <Command.Item
                onSelect={() => dispatch({ payload: { value: true, list: false }, type: "task" })}
              >
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
              <Command.Item>
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
              <Command.Item>
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
          </ScrollArea>
        </Command.List>
      </Command>
    </>
  );
}
