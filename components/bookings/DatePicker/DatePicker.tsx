"use client";
import { DatePicker as MantineDatePicker } from "@mantine/dates";

type PropTypes = {
  date: Date | null;
  onChange: (value: Date | null) => void;
};

export function DatePicker({ onChange, date }: PropTypes) {
  return (
    <MantineDatePicker
      value={date}
      onChange={onChange}
      label="Date"
      classNames={{
        input: `border-gray-400 dark:text-gray-400 text-gray-600 font-sans dark:border-gray-700
         bg-zinc-100 dark:bg-zinc-700 rounded-md`,
        label: "text-gray-900 font-sans dark:text-gray-300 text-md",
        dropdown: "bg-white border-gray-400 dark:border-gray-700 dark:bg-zinc-800",
        day: `text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-zinc-600
        data-[outside=true]:text-gray-300 data-[outside=true]:dark:text-gray-500 data-[weekend=true]:dark:text-red-500
        data-[weekend=true]:text-red-600`,
        weekday: "text-gray-500 dark:text-gray-400",
        month: "text-red-500 dark:text-gray-400",
        icon: "text-gray-700 dark:text-gray-100 stroke-gray-900",
        yearPickerControl: "hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-900 dark:text-gray-100",
        monthPickerControl: "hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-900 dark:text-gray-100",
        yearPickerControls: "text-rose-600 stroke-rose-600",
        calendarHeaderControl: "text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600",
        calendarHeaderLevel: "text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600",
        rightSection: "stroke-gray-900 dark:stroke-gray-400"
      }}
    />
  );
}
