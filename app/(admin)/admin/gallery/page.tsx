import { Grid } from "@/components/shared";
import { cache } from "react";
import prisma from "@/lib/prisma";
import { transformImage } from "@/lib/transform-image";
import { AddImages } from "./add-image";
import { UploadedImage } from "@/components/admin/gallery/UploadedImage";
import { Title } from "@aomdev/ui";
import { CreateResource } from "@/components/admin/create-resource";

const getImages = cache(async () => {
  await prisma.$connect();
  const images = await prisma.images.findMany({ where: { folderId: null } });
  await prisma.$disconnect();

  return images.map(img => {
    return {
      ...img,
      url: transformImage("w_900", img.publicId, img.type),
      original_url: img.url
    };
  });
});

export default async function GalleryPage() {
  const images = await getImages();
  return (
    <>
      <Grid fullWidth>
        <div className="col-span-full">
          <header className="flex items-center justify-between mb-5">
            {images.length > 0 ? (
              <Title order={1} className="font-heading font-medium text-4xl leading-none">
                Images ({images.length})
              </Title>
            ) : (
              <p>You haven&apos;t uploaded any images</p>
            )}
            <CreateResource type="photo">Add images</CreateResource>
          </header>
        </div>
        {images.map(image => {
          return <UploadedImage key={image.id} image={image} />;
        })}
      </Grid>
    </>
  );
}
