import { Grid } from "./shared";

export function Footer() {
  return (
    <footer className="border-t flex flex-col items-center border-gray-600 py-10">
      <Grid width="w-11/12">
        <div className="col-span-3 space-y-2">
          <p className="font-semibold text-lg">Yalography</p>
          <small className="text-gray-400">© 2022, All rights reserved</small>
        </div>
        <div className="col-span-3">
          <ul className="space-y-4">
            <li>About </li>
            <li>Projects</li>
            <li>Gallery</li>
          </ul>
        </div>
        <div className="col-span-3">
          <ul className="space-y-4">
            <li>Contact </li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="col-span-3 ">
          <p className="font-semibold text-lg mb-4">Follow us</p>
          <ul className="flex gap-4">
            <li className="rounded-full flex justify-center items-center bg-zinc-800 h-12 w-12">
              <a
                aria-label="Facebook page"
                title={"Facebook page"}
                href={"https://www.facebook.com/yalographysxm"}
                target={"_blank"}
                rel={"noreferrer"}
              >
                <Facebook />
              </a>
            </li>
            <li className="rounded-full flex justify-center items-center bg-zinc-800 h-12 w-12">
              <a
                title={"Instagram page"}
                aria-label={"Instagram page"}
                href={"https://instagram.com/yalography"}
                target={"_blank"}
                rel={"noreferrer"}
              >
                <Instagram />
              </a>
            </li>
          </ul>
        </div>
      </Grid>
    </footer>
  );
}

function Twitter() {
  return (
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
      </g>
    </svg>
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

import React from "react";

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
