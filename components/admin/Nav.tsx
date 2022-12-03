import * as Icon from "./icons";
import Link from "next/link";

export function Nav() {
  return (
    <div className="bg-white dark:bg-zinc-900 border-r dark:border-gray-600 w-1/5 h-screen fixed top-16 left-0 pt-10">
      <ul className="w-full flex gap-4 flex-col items-center">
        <li className="bg-red-200 dark:bg-red-600 dark:bg-opacity-50 flex gap-2 text-red-800 dark:text-red-200  w-4/5 py-2 rounded-md">
          <div className="basis-1/4 flex justify-center">
            <Icon.Home />
          </div>
          <Link href={"/admin"} className="basis-3/4">
            Dashboard
          </Link>
        </li>
        <li className="flex w-4/5 py-2 rounded-md hover:bg-red-600 hover:bg-opacity-50 hover:text-red-200 duration-200 ease-out">
          <div className="basis-1/4 flex justify-center">
            <Icon.Books />
          </div>
          <Link href={"/admin/reservations"} className="basis-3/4">
            Reservations
          </Link>
        </li>
      </ul>
    </div>
  );
}
