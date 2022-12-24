import { Badge, Card, Grid } from "@components/shared";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical, Download, Edit, Folders, Trash, Upload } from "@lib/icons";

const array = Array(9).fill(null);
const folders = Array(3).fill(null);

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
                <Dropdown.Root>
                  <Dropdown.Trigger>
                    <button
                      className={`flex h-9 w-9 rounded-full items-center justify-center bg-zinc-700 absolute right-5 top-5`}
                      aria-label="Edit image"
                    >
                      <DotsVertical size={16} />
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Label>Manage image</Dropdown.Label>
                    <Dropdown.Item>
                      <Edit size={16} className={"mr-2 inline-block stroke-yellow-600 dark:stroke-yellow-500"} />
                      Rename image
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Upload size={16} className={"mr-2 inline-block stroke-yellow-600 dark:stroke-yellow-500"} />
                      Copy url
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Download size={16} className={"mr-2 inline-block stroke-yellow-600 dark:stroke-yellow-500"} />
                      Download image
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Trash size={16} className={"mr-2 inline-block stroke-yellow-600 dark:stroke-yellow-500"} />
                      Delete image
                    </Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown.Root>
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
