import { cache } from "react";

import { GalleryProvider } from "@/components/admin/gallery/GalleryProvider";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/firebase/admin/auth";
import { transformImage } from "@/lib/transform-image";

const getImages = cache(async () => {
  await prisma.$connect();
  const imagesPromise = prisma.images.findMany({ where: { folderId: null } });
  const foldersPromise = prisma.imageFolders.findMany({ include: { Images: true } });

  const [cloudinaryImages, folders] = await Promise.all([imagesPromise, foldersPromise]);

  await prisma.$disconnect();

  const serializedFolders = folders.map(folder => {
    return {
      ...folder,
      createdAt: folder.createdAt.toDateString()
    };
  });

  const images = cloudinaryImages.map(img => {
    return {
      ...img,
      url: transformImage("w_900", img.publicId, img.type)
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
      <GalleryProvider images={images} folders={folders}>
        {children}
      </GalleryProvider>
    </>
  );
}
