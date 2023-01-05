"use client";
//Components
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";

export function TasksMenu() {
  return (
    <>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <button aria-label="Open menu">
            <DotsVertical size={16} />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Sort by</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  );
}
