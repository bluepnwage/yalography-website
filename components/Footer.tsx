import { Grid, ThemeIcon } from "./shared";
import Link from "next/link";
import { Facebook, Instagram } from "@/lib/icons";

export function Footer() {
  return (
    <footer className="border-t flex flex-col items-center  bg-white dark:bg-transparent border-gray-200 dark:border-gray-600 py-10">
      <Grid className="place-items-center lg:place-items-start text-center lg:text-start">
        <div className="col-span-full lg:col-span-3 space-y-2">
          <p className="font-semibold text-lg">Yalography</p>
          <small className="text-gray-400">© {new Date().getFullYear()}, All rights reserved.</small>
        </div>
        <div className="col-span-full lg:col-span-3">
          <ul className="space-y-4">
            <li>
              <Link href={"/about"}>About</Link>{" "}
            </li>
            <li>
              <Link href={"/projects"}>Projects</Link>
            </li>
            <li>
              <Link href={"/gallery"}>Gallery</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-full lg:col-span-3">
          <ul className="space-y-4">
            <li>
              <Link href={"/bookings"}>Bookings</Link>{" "}
            </li>
          </ul>
        </div>
        <div className="col-span-full lg:col-span-3">
          <p className="font-semibold text-lg mb-4">Follow us</p>
          <ul className="flex gap-4">
            <li>
              <ThemeIcon gradient={false} size={"sm"}>
                <a
                  aria-label="Facebook page"
                  title={"Facebook page"}
                  href={"https://www.facebook.com/yalographysxm"}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  <Facebook className="stroke-gray-100" />
                </a>
              </ThemeIcon>
            </li>
            <li>
              <ThemeIcon gradient={false} size={"sm"}>
                <a
                  title={"Instagram page"}
                  aria-label={"Instagram page"}
                  href={"https://instagram.com/yalography"}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  <Instagram className="stroke-gray-100" />
                </a>
              </ThemeIcon>
            </li>
          </ul>
        </div>
      </Grid>
    </footer>
  );
}
