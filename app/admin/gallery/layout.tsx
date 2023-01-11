import { FlexContainer } from "@components/shared";
import { UploadDialog } from "@components/admin/gallery/UploadDialog";
import { Revalidate } from "@components/admin/gallery/Revalidate";
import { cache } from "react";

import { GalleryProvider } from "@components/admin/gallery/GalleryProvider";
import prisma from "@lib/prisma";
import { verifyToken } from "@lib/firebase/admin/auth";

const getImages = cache(async () => {
  await prisma.$connect();
  const imagesPromise = prisma.images.findMany({ where: { folderId: null } });
  const foldersPromise = prisma.imageFolders.findMany({ include: { Images: true } });

  const [images, folders] = await Promise.all([imagesPromise, foldersPromise]);

  await prisma.$disconnect();

  const serializedFolders = folders.map((folder) => {
    return {
      ...folder,
      createdAt: folder.createdAt.toDateString()
    };
  });
  return { images, folders: serializedFolders };
});

export const dynamic = "force-dynamic";
export const revalidate = process.env.NODE_ENV === "development" ? false : 0;

type PropTypes = {
  children: React.ReactNode;
};

export default async function Layout({ children }: PropTypes) {
  await verifyToken();

  const { images, folders } = await getImages();

  let totalImages = images.length;
  for (let i = 0; i < folders.length; i++) {
    totalImages += folders[i].Images.length;
  }
  return (
    <>
      <div className="border-b mb-5 z-50 -mt-5 bg-white border-zinc-200 dark:bg-zinc-900 p-5 dark:border-zinc-600 -mx-5 sticky top-[64px] ">
        <FlexContainer className="justify-evenly items-center">
          <div className="text-center">
            <p>Total images: {totalImages}</p>
          </div>
          <div className="text-center">
            <p>Total folders: {folders.length}</p>
          </div>
          <div className="space-x-2">
            <UploadDialog folders={folders} />
            <Revalidate />
          </div>
        </FlexContainer>
      </div>
      <GalleryProvider images={images} folders={folders}>
        {children}
      </GalleryProvider>
    </>
  );
}
