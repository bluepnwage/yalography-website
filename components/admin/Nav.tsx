import { NavLink } from "./NavLink";
import {
  IconHome,
  IconPhoto,
  IconListCheck,
  IconClipboardData,
  IconLayoutBottombar
} from "@tabler/icons-react";

import { SignOut } from "./SignOut";

const links = [
  {
    href: "/admin",
    label: "Home",
    Icon: <IconHome />
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
    Icon: <IconClipboardData />
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    Icon: <IconPhoto />
  },
  {
    href: "/admin/tasks",
    label: "Tasks",
    Icon: <IconListCheck />
  },
  {
    href: "/admin/projects",
    label: "Projects",
    Icon: <IconLayoutBottombar />
  }
];

export function Nav() {
  return (
    <div className="bg-white dark:bg-neutral-900 space-y-4 border-r dark:border-gray-600 w-1/6 h-screen fixed top-16 left-0 pt-10">
      <ul className="w-full flex gap-4 flex-col items-center">
        {links.map((link, key) => {
          return <NavLink {...link} key={key} />;
        })}
      </ul>
      <SignOut />
    </div>
  );
}
