"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./styles.module.css";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`flex h-9 w-9 rounded-full items-center justify-center bg-zinc-700 absolute right-5 top-5`}
          aria-label="Edit image"
        >
          <DotsVertical />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`${styles.DropdownMenuContent} bg-white dark:bg-zinc-800 rounded-sm py-2 space-y-2`}
          sideOffset={5}
        >
          <DropdownMenu.Label className="text-sm p-5 h-5 leading-4">Manage image</DropdownMenu.Label>
          <DropDownItem>
            <Edit />
            Rename image
          </DropDownItem>
          <DropDownItem>
            <Upload />
            Copy url
          </DropDownItem>
          <DropDownItem>
            <Download />
            Download image
          </DropDownItem>
          <DropDownItem>
            <Trash />
            Delete image
          </DropDownItem>
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

function Trash() {
  return (
    <svg
      height={16}
      width={16}
      className="inline-block mr-2 stroke-yellow-600 dark:stroke-yellow-500"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 7h16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
        <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </g>
    </svg>
  );
}

function DotsVertical() {
  return (
    <svg
      height={16}
      width={16}
      className="stroke-gray-100 dark:stroke-gray-100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
        <circle cx="12" cy="5" r="1" />
      </g>
    </svg>
  );
}

function Upload() {
  return (
    <svg
      height={16}
      width={16}
      className="inline-block mr-2 stroke-yellow-600 dark:stroke-yellow-500"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        <path d="M7 9l5-5 5 5" />
        <path d="M12 4v12" />
      </g>
    </svg>
  );
}

function Download() {
  return (
    <svg
      height={16}
      width={16}
      className="inline-block mr-2 stroke-yellow-600 dark:stroke-yellow-500"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        <path d="M7 11l5 5 5-5" />
        <path d="M12 4v12" />
      </g>
    </svg>
  );
}

function Edit() {
  return (
    <svg
      height={16}
      width={16}
      className="inline-block mr-2 stroke-yellow-600 dark:stroke-yellow-500"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
        <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415z" />
        <path d="M16 5l3 3" />
      </g>
    </svg>
  );
}
