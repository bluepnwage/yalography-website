import { Button } from "./shared";
import Link from "next/link";

const navLinks = ["Home", "Reservation", "About", "Gallery"];

export function Header() {
  return (
    <header className="flex justify-center items-center border-b border-gray-600 bg-zinc-900 bg-opacity-80  h-16  backdrop-blur-md sticky top-0 left-0">
      <div className="w-11/12 flex justify-between items-center">
        <p className="font-bold text-white text-lg">Yalography</p>
        <nav>
          <ul className="flex gap-4 items-center h-full text-gray-300">
            {navLinks.map((link, key) => {
              return (
                <li key={key}>
                  <Link href={"/"} className="hover:text-yellow-400 duration-200 ease-out font-semibold">
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="space-x-3">
          <Link href={"/"} className="text-gray-300 font-semibold hover:text-yellow-400 duration-200 ease-out">
            Login
          </Link>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  );
}
