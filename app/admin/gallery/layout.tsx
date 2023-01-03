import { FlexContainer } from "@components/shared";
import { UploadDialog } from "@components/admin/gallery/UploadDialog";

import { GalleryProvider } from "@components/admin/gallery/GalleryProvider";
import prisma from "@lib/prisma";

async function getImages() {
  await prisma.$connect();
  const images = await prisma.images.findMany();
  await prisma.$disconnect();
  return images;
}

export const dynamic = "force-dynamic";
export const revalidate = process.env.NODE_ENV === "development" ? false : 0;

type PropTypes = {
  children: React.ReactNode;
};

export default async function Layout({ children }: PropTypes) {
  const images = await getImages();
  return (
    <>
      <div className="border-b mb-5 z-10 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly items-center">
          <div className="text-center">
            <p>Total images: {images.length}</p>
          </div>
          <div className="text-center">
            <p>Total folders: 3</p>
          </div>
          <UploadDialog />
        </FlexContainer>
      </div>
      {children}
      <GalleryProvider images={images}>{children}</GalleryProvider>
    </>
  );
}
