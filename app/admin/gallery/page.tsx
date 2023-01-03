import { Images } from "@components/admin/gallery/Images";
import { Grid } from "@components/shared";
import { Folders } from "@components/admin/gallery/Folders";

export default function GalleryPage() {
  return (
    <>
      <Grid fullWidth className="mb-10">
        <Folders />
      </Grid>
      <Grid fullWidth>
        <Images />
      </Grid>
    </>
  );
}
