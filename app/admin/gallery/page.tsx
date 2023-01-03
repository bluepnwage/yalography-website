import { Gallery } from "@components/admin/gallery/Gallery";
import { Images } from "@components/admin/gallery/Images";
import { Grid } from "@components/shared";
export default function GalleryPage() {
  return (
    <>
      <Grid fullWidth>
        <Images />
      </Grid>
    </>
  );
}
