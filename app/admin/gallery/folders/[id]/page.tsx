"use client";
import { useGallery } from "@components/admin/gallery/GalleryProvider";
import { UploadedImage } from "@components/admin/gallery/UploadedImage";
import { Breadcrumbs } from "@components/shared";
import Link from "next/link";

export default function FolderPage({ params }: { params: { id: string } }) {
  const { folders } = useGallery();

  const folder = folders.find((f) => f.id === parseInt(params.id))!;

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
