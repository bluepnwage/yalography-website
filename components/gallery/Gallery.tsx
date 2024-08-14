import type { Resources } from "@prisma/client";
import { Image } from "@/components/shared/Image";

type PropTypes = {
  images: Resources[];
};
export function Gallery({ images }: PropTypes) {
  return (
    <>
      <div
        style={{ gridAutoFlow: "dense" }}
        className="grid grid-cols-2 gap-2 w-[75%]"
      >
        {images.map((image) => {
          return (
            <Image
              key={image.id}
              width={image.width}
              height={image.height}
              src={image.url}
              alt={image.alt || ""}
              refMargin={"100px"}
              containerClass={`${
                image.width - image.height > 1 ? "col-span-2" : "lg:col-span-1 col-span-2 row-span-2"
              }`}
              className={`w-full h-full `}
            />
          );
        })}
      </div>
    </>
  );
}
