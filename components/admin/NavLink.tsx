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
      data-active={path === href}
      className={cx(
        "w-4/5 rounded-md group hover:text-gray-800 hover:bg-slate-100 dark:hover:text-gray-100 dark:hover:bg-primary-600/20 duration-200 ease-out",
        "data-[active=true]:font-medium data-[active=true]:bg-primary-600/20 data-[active=true]:text-primary-200"
      )}
    >
      <Link href={href} className="px-1 py-2 flex items-center">
        <span className="inline-block mr-4 group-data-[active=true]:text-primary-200">{Icon}</span>
        {label}
      </Link>
    </li>
  );
}
