"use client";
import { IconMenu, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
export function MobileMenu() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };
  return (
    <>
      <button
        aria-label={menu ? "Close navigation" : "Open navigation"}
        className="md:hidden dark:text-gray-300 px-4 py-2"
        onClick={toggleMenu}
      >
        {menu ? <IconX /> : <IconMenu />}
      </button>
      <AnimatePresence>
        {menu && (
          <motion.div
            key={"modal"}
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vw" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed top-0 left-0 bg-white dark:bg-neutral-900 z-[9999]  w-screen h-screen"
            role={"dialog"}
            aria-labelledby="navigation"
          >
            <div className="flex justify-between items-center mb-4 p-4">
              <Image
                src={logo}
                alt={"Official Yalography logo"}
                className="h-12 w-12 bg-zinc-900 dark:bg-transparent rounded-md p-1"
              />
              <button
                aria-label="Close modal"
                className="  block text-black dark:text-gray-300 px-4 py-2"
                onClick={() => setMenu(false)}
              >
                <IconX />
              </button>
            </div>
            <div className="flex flex-col gap-10 items-center">
              <ul
                onClick={() => setMenu(false)}
                className="text-center space-y-4"
              >
                <li>
                  <Link
                    className="text-yellow-600 dark:text-yellow-500"
                    href={"/"}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-yellow-600 dark:text-yellow-500"
                    href={"/about"}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-yellow-600 dark:text-yellow-500"
                    href={"/gallery"}
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
