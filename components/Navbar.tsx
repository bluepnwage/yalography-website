import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import logo from "@/public/logo.png";
import Image from "next/image";
import { MobileMenu } from "./MobileMenu";
import { Suspense } from "react";
import { Admin } from "./Admin";
import { BookSession } from "./book-session/book-session";

interface NavLinkProps {
  href: string;
  text: string;
}

const navLinks: NavLinkProps[] = [
  { href: "/", text: "Home" },
  { text: "About", href: "/about" },
  { text: "Gallery", href: "/gallery" }
];

export function Header() {
  return (
    <header className="flex justify-center z-20 items-center border-b bg-white dark:bg-neutral-900  border-gray-200 dark:border-gray-700  bg-opacity-80 dark:bg-opacity-80  h-16  backdrop-blur-md sticky top-0 left-0 duration-200 ease-out">
      <div className="w-11/12 flex justify-between items-center">
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
        <nav className="hidden lg:block">
          <ul className="flex gap-4 items-center h-full text-gray-700 dark:text-gray-300">
            {navLinks.map((link, key) => {
              return (
                <li key={key}>
                  <Link
                    href={link.href}
                    className="hover:text-yellow-500 dark:hover:text-yellow-400 duration-200 ease-out font-semibold"
                  >
                    {link.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex gap-4 items-center">
          <BookSession buttonSize={"sm"} />
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
          <Suspense fallback={null}>
            <Admin />
          </Suspense>
          <Suspense fallback={null}>
            <ThemeSwitcher />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
