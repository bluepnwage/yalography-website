import { NavLink } from "./NavLink";
import { ListCheck, Home, Ballot, Books, Photo } from "@lib/icons";

const links = [
  {
    href: "/admin",
    label: "Home",
    Icon: <Home />
  },
  {
    href: "/admin/reservations",
    label: "Reservations",
    Icon: <Books className={"fill-gray-500 dark:fill-gray-100"} />
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    Icon: <Photo />
  },
  {
    href: "/admin/tasks",
    label: "Tasks",
    Icon: <ListCheck />
  },
  {
    href: "/admin/projects",
    label: "Projects",
    Icon: <Ballot className={"fill-gray-500 dark:fill-gray-100"} />
  }
];

export function Nav() {
  return (
    <div className="bg-white dark:bg-zinc-900 border-r dark:border-gray-600 w-1/5 h-screen fixed top-16 left-0 pt-10">
      <ul className="w-full flex gap-4 flex-col items-center">
        {links.map((link, key) => {
          return <NavLink {...link} key={key} />;
        })}
      </ul>
    </div>
  );
}
