"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cx } from "cva";

type PropTypes = {
  href: string;
  label: string;
  Icon: React.ReactNode;
};

export function NavLink({ href, label, Icon }: PropTypes) {
  const path = usePathname();
  return (
    <li
      className={cx(
        "flex gap-2  w-4/5 py-2 rounded-md hover:text-gray-800 hover:bg-slate-100 dark:hover:text-gray-100 dark:hover:bg-slate-600 duration-200 ease-out",
        path === href ? "text-gray-800 dark:text-gray-100 bg-slate-100 dark:bg-slate-600" : ""
      )}
    >
      <div className="basis-1/4 flex justify-center">{Icon}</div>
      <Link href={href} className="basis-3/4">
        {label}
      </Link>
    </li>
  );
}
