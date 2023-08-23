"use client";
import { Command } from "@aomdev/ui";
import { useReducer } from "react";
import { useHotkeys } from "@mantine/hooks";
import {
  IconListCheck,
  IconLayoutBottombar,
  IconClipboardData,
  IconPlus,
  IconRefresh
} from "@tabler/icons-react";
import { initialState, reducer } from "./command-reducer";
import { BookingDialog } from "./bookings-dialog";
import { GalleryDialog } from "./gallery-dialog";
import { ProjectDialog } from "./project-dialog";
import { TaskDialog } from "./task-dialog";

export function AdminCommand() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useHotkeys([["ctrl+k", () => dispatch({ payload: true, type: "command" })]]);

  return (
    <>
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
        taskLists={[]}
        dialogProps={{ open: state.task, onOpenChange: payload => dispatch({ payload, type: "task" }) }}
      />
      <Command
        open={state.command}
        onOpenChange={payload => dispatch({ payload, type: "command" })}
        contentProps={{ className: "w-2/4" }}
      >
        <Command.Input></Command.Input>
        <Command.List>
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
            <Command.Item onSelect={() => dispatch({ payload: true, type: "task" })}>
              {" "}
              <IconPlus size={18} className="inline-block mr-2 text-gray-600 dark:text-gray-300" />
              Create Task...
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
        </Command.List>
      </Command>
    </>
  );
}
