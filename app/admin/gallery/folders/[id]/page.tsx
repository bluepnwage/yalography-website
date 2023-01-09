import { UploadedImage } from "@components/admin/gallery/UploadedImage";
import { Breadcrumbs } from "@components/shared";
import Link from "next/link";
import { notFound } from "next/navigation";

import prisma from "@lib/prisma";
import { cache } from "react";

const getFolder = cache(async (id: number) => {
  await prisma.$connect();
  const folder = await prisma.imageFolders.findFirst({ where: { id }, include: { Images: true } });
  await prisma.$disconnect();
  if (!folder) notFound();
  return { ...folder, createdAt: folder.createdAt.toDateString() };
});

export default async function FolderPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (!id) notFound();
  const folder = await getFolder(parseInt(params.id));

  return (
    <>
      <Breadcrumbs>
        <Link className="text-yellow-600 dark:text-yellow-500" href={"/admin/gallery"}>
          Gallery
        </Link>
        <Link className="text-yellow-600 dark:text-yellow-500" href={"/admin/gallery/folders"}>
          Folders
        </Link>
        <Link className="text-yellow-600 dark:text-yellow-500" href={`/admin/gallery/folders/${folder.id}`}>
          {folder.name}
        </Link>
      </Breadcrumbs>
      <p className="my-4 font-bold text-xl">{folder.name}</p>
      <div className="grid grid-cols-12 w-full gap-2">
        {folder.Images.map((image) => {
          return <UploadedImage image={image} key={image.id} />;
        })}
      </div>
    </>
  );
}
