import { Badge, Card, Grid } from "@components/shared";
const array = Array(9).fill(null);
const folders = Array(3).fill(null);
export function Gallery() {
  return (
    <>
      <Grid fullWidth>
        {folders.map((_, key) => {
          return (
            <Card key={key} className="col-span-4">
              <p>(Folder icon) Marriage 2019</p>
            </Card>
          );
        })}
        {array.map((_, key) => {
          return (
            <Card key={key} className="col-span-4 overflow-hidden space-y-4">
              <figure className="bg-emerald-500 group -mx-4 -mt-4 h-48 relative">
                <button className="absolute hidden bg-black p-2 right-2 top-2 group-hover:flex justify-center items-center h-10 w-10 rounded-full">
                  3
                </button>
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
