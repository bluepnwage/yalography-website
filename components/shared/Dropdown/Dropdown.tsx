"use client";
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import styles from "./styles.module.css";

export function DropdownMenuDemo() {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={`${styles.IconButton} bg-zinc-700 absolute right-5 top-5`} aria-label="Customise options">
          T
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`${styles.DropdownMenuContent} bg-white dark:bg-zinc-800 rounded-sm py-2 space-y-2`}
          sideOffset={5}
        >
          <DropdownMenu.Label className="text-sm p-5 h-5 leading-4">Edit photo</DropdownMenu.Label>
          <DropDownItem>Delete image</DropDownItem>
          <DropDownItem>Upload image</DropDownItem>
          <DropDownItem>Download image</DropDownItem>
          <DropDownItem>Rename image</DropDownItem>
          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

type PropTypes = {
  children: React.ReactNode;
};

function DropDownItem({ children }: PropTypes) {
  return (
    <DropdownMenu.Item className="outline-none select-none h-7 text-sm py-2 data-[highlighted]:bg-gray-200 dark:data-[highlighted]:bg-zinc-700  pl-5 text-gray-900 dark:text-gray-100 relative rounded-sm flex items-center">
      {children}
    </DropdownMenu.Item>
  );
}
