"use client";

import { useGallery } from "./GalleryProvider";
import { UploadedImage } from "./UploadedImage";

export function Images() {
  const images = useGallery("images");
  return (
    <>
      <div className="col-span-full">
        <h2 className="font-bold text-xl">Images ({images.length})</h2>
        {images.length === 0 && <p>You haven&apos;t uploaded any images</p>}
      </div>
      {images?.map((image) => {
        return <UploadedImage key={image.id} image={image} />;
      })}
    </>
  );
}
