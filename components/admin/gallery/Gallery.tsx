import { Badge, Card, Grid } from "@components/shared";
const array = Array(9).fill(null);
const folders = Array(3).fill(null);
import { DropdownMenuDemo } from "@components/shared/Dropdown";

export function Gallery() {
  return (
    <>
      <Grid fullWidth>
        {folders.map((_, key) => {
          return (
            <Card key={key} className="col-span-4">
              <p>
                <Folders />
                Marriage 2019
              </p>
            </Card>
          );
        })}
        {array.map((_, key) => {
          return (
            <Card key={key} className="col-span-4 overflow-hidden space-y-4">
              <figure className="bg-emerald-500 group -mx-4 -mt-4 h-48 relative">
                <DropdownMenuDemo />
              </figure>
              <div className="flex justify-between">
                <p className="font-bold text-xl">Random name for image</p>
                <Badge color={"green"} className="px-2 text-sm h-fit">
                  Uploaded
                </Badge>
              </div>
              <div className="flex justify-between">
                <p>image/png</p>
                <p>751kb</p>
              </div>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}

function Folders() {
  return (
    <svg
      height="24"
      width="24"
      className="stroke-gray-900 dark:stroke-gray-200"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
        <path d="M17 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      </g>
    </svg>
  );
}
