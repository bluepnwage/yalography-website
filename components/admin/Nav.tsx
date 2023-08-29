import { NavLink } from "./NavLink";
import {
  IconHome,
  IconPhoto,
  IconListCheck,
  IconClipboardData,
  IconLayoutBottombar
} from "@tabler/icons-react";

import { SignOut } from "./SignOut";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { AdminCommandContainer } from "./admin-command-container";
import { Suspense } from "react";
import { Skeleton } from "../shared";

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
    <div className=" space-y-4 border-r dark:border-gray-700 w-1/6 h-screen fixed top-0 left-0 pt-10 px-4">
      <Link href={"/"} className="block mb-6">
        <figure className="flex gap-1 xl:gap-4 items-center">
          <Image
            src={logo}
            alt={"Official Yalography logo"}
            className="h-8 w-8 xl:h-12 xl:w-12 bg-zinc-900 dark:bg-transparent rounded-md p-1"
          />
          <figcaption className="font-bold hidden lg:block text-gray-900 dark:text-white lg:text-lg">
            Yalography
          </figcaption>
        </figure>
      </Link>
      <Suspense fallback={<CommandLoading />}>
        <AdminCommandContainer />
      </Suspense>
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

function CommandLoading() {
  return (
    <div className="flex items-center gap-2">
      <div className={"relative basis-3/4 grow overflow-hidden rounded h-8 "}>
        <Skeleton radius={"sm"} className="w-full h-full" />
        <Skeleton.Shimmer />
      </div>
      <div className={"h-8 w-8 rounded relative overflow-hidden"}>
        <Skeleton radius={"sm"} className="h-full w-full" />
        <Skeleton.Shimmer />
      </div>
    </div>
  );
}
