"use client";

import { useGallery } from "./GalleryProvider";
import { UploadedImage } from "./UploadedImage";
import { usePagination } from "@lib/hooks/usePagination";
import { Pagination } from "@components/shared/Pagination";

export function Images() {
  const { images } = useGallery();
  const { paginatedList, ...props } = usePagination(10, images);
  return (
    <>
      <div className="col-span-full">
        <h2 className="font-bold text-xl">Images ({images.length})</h2>
        {images.length === 0 && <p>You haven&apos;t uploaded any images</p>}
      </div>
      {paginatedList.map(image => {
        return <UploadedImage key={image.id} image={image} />;
      })}
      <div className="col-span-full">
        <Pagination {...props} />
      </div>
    </>
  );
}
