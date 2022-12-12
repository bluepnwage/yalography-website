"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./styles.module.css";

type PropTypes = {
  children: React.ReactNode;
};

export function Item({ children }: PropTypes) {
  return (
    <DropdownMenu.Item className="outline-none select-none h-7 text-sm py-2 data-[highlighted]:bg-gray-200 dark:data-[highlighted]:bg-zinc-700  pl-5 text-gray-900 dark:text-gray-100 relative rounded-sm flex items-center">
      {children}
    </DropdownMenu.Item>
  );
}

export function Trigger({ children }: PropTypes) {
  return <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>;
}

export function Content({ children }: PropTypes) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={`${styles.DropdownMenuContent} bg-white dark:bg-zinc-800 rounded-sm py-2 space-y-2`}
        sideOffset={5}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

export function Label({ children }: PropTypes) {
  return <DropdownMenu.Label className="text-sm p-5 h-5 leading-4">{children}</DropdownMenu.Label>;
}

export function Root({ children }: PropTypes) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}
