import * as Icon from "./icons";
import { NavLink } from "./NavLink";

const links = [
  {
    href: "/admin",
    label: "Home",
    Icon: <Icon.Home />
  },
  {
    href: "/admin/reservations",
    label: "Reservations",
    Icon: <Icon.Books />
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    Icon: <Icon.Home />
  },
  {
    href: "/admin/tasks",
    label: "Tasks",
    Icon: <Icon.Home />
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
