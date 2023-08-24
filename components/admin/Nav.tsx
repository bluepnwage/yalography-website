import { NavLink } from "./NavLink";
import {
  IconHome,
  IconPhoto,
  IconListCheck,
  IconClipboardData,
  IconLayoutBottombar
} from "@tabler/icons-react";

import { SignOut } from "./SignOut";
import { AdminCommand } from "./command";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

const links = [
  {
    href: "/admin",
    label: "Home",
    Icon: <IconHome size={16} />
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
    Icon: <IconClipboardData size={16} />
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    Icon: <IconPhoto size={16} />
  },
  {
    href: "/admin/tasks",
    label: "Tasks",
    Icon: <IconListCheck size={16} />
  },
  {
    href: "/admin/projects",
    label: "Projects",
    Icon: <IconLayoutBottombar size={16} />
  }
];

export function Nav() {
  return (
    <div className="bg-white dark:bg-neutral-900 space-y-4 border-r dark:border-gray-700 w-1/6 h-screen fixed top-0 left-0 pt-10 px-4">
      <Link href={"/"}>
        <figure className="flex gap-4 items-center">
          <Image
            src={logo}
            alt={"Official Yalography logo"}
            className="h-12 w-12 bg-zinc-900 dark:bg-transparent rounded-md p-1"
          />
          <figcaption className="font-bold hidden lg:block text-gray-900 dark:text-white text-lg">
            Yalography
          </figcaption>
        </figure>
      </Link>
      <AdminCommand />
      <div role="separator" className="h-[1px] bg-gray-200 w-full  dark:bg-gray-700" />
      <ul className="w-full flex gap-4 flex-col">
        {links.map((link, key) => {
          return <NavLink {...link} key={key} />;
        })}
      </ul>
      <SignOut />
    </div>
  );
}
