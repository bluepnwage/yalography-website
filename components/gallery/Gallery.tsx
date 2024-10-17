import type { Resources } from "@prisma/client";
import { Image } from "@/components/shared/Image";

type PropTypes = {
  images: Resources[];
};
export function Gallery({ images }: PropTypes) {
  return (
    <>
      <div
        style={{ gridAutoFlow: "row" }}
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-11/12 lg:w-[75%]"
      >
        {images.map((image) => {
          return (
            <Image
              key={image.id}
              src={image.url}
              alt=""
              width={image.width}
              height={image.height}
              className="w-full rounded"
              containerClass="mb-4 break-inside-avoid"
            />
          );
        })}
      </div>
    </>
  );
}
