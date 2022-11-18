import { Grid, Section } from "./shared";

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
            <li className="rounded-full bg-zinc-800 h-16 w-16"></li>
            <li className="rounded-full bg-zinc-800 h-16 w-16"></li>
            <li className="rounded-full bg-zinc-800 h-16 w-16"></li>
          </ul>
        </div>
      </Grid>
    </footer>
  );
}
