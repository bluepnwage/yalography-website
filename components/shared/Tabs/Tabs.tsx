"use client";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "./styles.module.css";

function Content({ children, value }: Tabs.TabsContentProps) {
  return (
    <Tabs.Content
      className={`bg-white dark:bg-zinc-800 ring-red-600 dark:ring-red-500/30 focus:ring-1 ${styles.TabsContent}`}
      value={value}
    >
      {children}
    </Tabs.Content>
  );
}

function Trigger({ children, ...props }: Tabs.TabsTriggerProps) {
  return (
    <Tabs.Trigger
      {...props}
      className={`bg-white focus:border-2 data-[disabled]:grayscale data-[disabled]:dark:text-gray-500 data-[disabled]:text-gray-600 focus:border-red-600 focus:border-b-0 dark:bg-zinc-800 ${styles.TabsTrigger}`}
    >
      {children}
    </Tabs.Trigger>
  );
}

function List({ children, ...props }: Tabs.TabsListProps) {
  return (
    <Tabs.List {...props} className="flex border-b border-b-zinc-200 dark:border-b-zinc-700">
      {children}
    </Tabs.List>
  );
}

export function TabsDemo({ children, ...props }: Tabs.TabsProps) {
  return (
    <Tabs.Root {...props} className={"flex flex-col ring-1 ring-black/10 rounded-md dark:shadow-none"}>
      {children}
    </Tabs.Root>
  );
}

TabsDemo.Content = Content;
TabsDemo.Trigger = Trigger;
TabsDemo.List = List;
