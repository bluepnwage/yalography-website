import { Grid } from "@/components/shared";
import { cache } from "react";
import prisma from "@/lib/prisma";
import { transformImage } from "@/lib/transform-image";
import { UploadedImage } from "@/components/admin/gallery/UploadedImage";
import { Title } from "@aomdev/ui";
import { UploadedVideo } from "@/components/admin/gallery/uploaded-video";

const getImages = cache(async () => {
  const files = await prisma.resources.findMany();
  console.log(files);
  return {
    files
  };
});

export default async function GalleryPage() {
  const { files } = await getImages();
  const videos = files.filter((f) => f.resourceType === "video");
  const images = files.filter((f) => f.resourceType === "image");

  return (
    <>
      <Grid
        fullWidth
        className="mt-20"
      >
        <div className="col-span-full">
          <header className="flex items-center justify-between mb-5">
            {images.length > 0 ? (
              <Title
                order={1}
                className="font-heading font-medium text-4xl leading-none"
              >
                Images ({images.length})
              </Title>
            ) : (
              <p>You haven&apos;t uploaded any images</p>
            )}
          </header>
        </div>
        {images.map((image) => {
          return (
            <UploadedImage
              key={image.id}
              image={{
                ...image,
                url: transformImage("w_900", image.publicId, image.type),
                original_url: image.url
              }}
            />
          );
        })}
      </Grid>
      <Grid
        fullWidth
        className="mt-20"
      >
        <div className="col-span-full">
          <header className="flex items-center justify-between mb-5">
            {videos.length > 0 ? (
              <Title
                order={1}
                className="font-heading font-medium text-4xl leading-none"
              >
                Videos ({videos.length})
              </Title>
            ) : (
              <p>You haven&apos;t uploaded any images</p>
            )}
          </header>
        </div>
        {videos.map((video) => {
          return <UploadedVideo image={video} />;
        })}
      </Grid>
    </>
  );
}
