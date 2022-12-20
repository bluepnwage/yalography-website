"use client";
import * as RadixSelect from "@radix-ui/react-select";
import { cx } from "cva";
import { forwardRef } from "react";

type SelectData = {
  label: string;
  value: string;
};

type SelectProps = {
  data: SelectData[];
  placeholder?: string;
} & RadixSelect.SelectProps;

export function Select({ data, placeholder, ...props }: SelectProps) {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger className="rounded-md relative inline-flex ring-1 ring-gray-400 dark:ring-gray-700 px-2 w-full justify-between data-[placeholder]:text-gray-500 data-[placeholder]:dark:text-gray-300 focus:ring-red-600  dark:focus:ring-red-600  items-center py-2 radius-md gap-2 bg-zinc-100 dark:bg-zinc-700 text-gray-900 dark:text-gray-100">
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="">
          <ChevronDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="bg-white ring-1 z-[9999] ring-gray-400 text-gray-100 dark:ring-gray-600 dark:bg-zinc-700 w-full rounded-md">
          <RadixSelect.Viewport>
            {data.map((option, key) => {
              return (
                <SelectItem key={key} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

const SelectItem = forwardRef<HTMLDivElement, RadixSelect.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={cx(
          "select-none group flex items-center px-7 py-2 text-gray-900 overflow-hidden dark:text-gray-100 relative rounded-sm data-[highlighted]:bg-red-600 data-[highlighted]:text-gray-50 data-[highlighted]:rounded-md data-[highlighted]:dark:bg-red-500",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
          <Check />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

function ChevronDown() {
  return (
    <svg
      height={16}
      width={16}
      className={"stroke-gray-900  dark:stroke-gray-400"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M6 9l6 6 6-6" />
      </g>
    </svg>
  );
}

function Check() {
  return (
    <svg
      height={16}
      width={16}
      className={"stroke-gray-900 dark:stroke-gray-300 group-data-[highlighted]:stroke-gray-50"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M5 12l5 5L20 7" />
      </g>
    </svg>
  );
}
