import { Grid, ThemeIcon } from "./shared";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t flex flex-col items-center  bg-white dark:bg-transparent border-gray-200 dark:border-gray-600 py-10">
      <Grid className="place-items-center lg:place-items-start text-center lg:text-start">
        <div className="col-span-full lg:col-span-3 space-y-2">
          <p className="font-semibold text-lg">Yalography</p>
          <small className="text-gray-400">© 2022, All rights reserved</small>
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
                  <Facebook />
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
                  <Instagram />
                </a>
              </ThemeIcon>
            </li>
          </ul>
        </div>
      </Grid>
    </footer>
  );
}

function Facebook() {
  return (
    <svg height={24} width={24} viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
      <g fill="#ffffff">
        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
      </g>
    </svg>
  );
}

function Instagram() {
  return (
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M16.5 7.5v.001" />
        <rect height="16" width="16" rx="4" x="4" y="4" />
        <circle cx="12" cy="12" r="3" />
      </g>
    </svg>
  );
}
