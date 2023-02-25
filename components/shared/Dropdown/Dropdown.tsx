"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { variants, item } from "./animation";

function Item({ children, ...props }: DropdownMenu.DropdownMenuItemProps) {
  return (
    <DropdownMenu.Item
      {...props}
      asChild
      className="outline-none select-none h-7 text-sm py-2 data-[highlighted]:bg-gray-200 dark:data-[highlighted]:bg-zinc-700  pl-5 text-gray-900 dark:text-gray-100 relative rounded-sm flex items-center"
    >
      <motion.div variants={item}>{children}</motion.div>
    </DropdownMenu.Item>
  );
}

function Trigger({ children, ...props }: DropdownMenu.DropdownMenuTriggerProps) {
  return (
    <DropdownMenu.Trigger {...props} asChild>
      {children}
    </DropdownMenu.Trigger>
  );
}

type ContentProps = {
  portalProps?: DropdownMenu.DropdownMenuPortalProps;
} & DropdownMenu.DropdownMenuContentProps;

function Content({ children, portalProps, ...props }: ContentProps) {
  return (
    <DropdownMenu.Portal {...portalProps}>
      <DropdownMenu.Content
        {...props}
        asChild
        className={`${styles.DropdownMenuContent} bg-white dark:bg-zinc-800 rounded-sm py-2 space-y-2`}
        sideOffset={props.sideOffset || 5}
      >
        <motion.div variants={variants} exit={"exit"} initial={"hidden"} animate={"visible"}>
          {children}
        </motion.div>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

function Label({ children, ...props }: DropdownMenu.DropdownMenuLabelProps) {
  return (
    <DropdownMenu.Label {...props} className="text-sm p-5 h-5 leading-4">
      {children}
    </DropdownMenu.Label>
  );
}

export function Dropdown({ children, ...props }: DropdownMenu.DropdownMenuProps) {
  return <DropdownMenu.Root {...props}>{children}</DropdownMenu.Root>;
}

Dropdown.Label = Label;
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Item = Item;
