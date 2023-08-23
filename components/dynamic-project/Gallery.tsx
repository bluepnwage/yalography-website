import { Title } from "@/components/shared";
import { Image } from "@/components/shared/Image";
import { transformImage } from "@/lib/transform-image";
import type { Images } from "@prisma/client";

type PropTypes = {
  images: Images[];
};

export function Gallery({ images }: PropTypes) {
  return (
    <>
      <div className="text-center space-y-2 py-10">
        <Title order={"h2"} color={"red"} size={"md"}>
          Gallery
        </Title>
        <Title order={"h3"}>See the images that brought this project to life</Title>
      </div>
      <section className={"grid grid-cols-3 gap-8"}>
        {images.map(image => {
          return (
            <Image
              containerClass={``}
              key={image.id}
              src={transformImage("w_1500", image.publicId, image.type)}
              width={image.width}
              height={image.height}
              alt={""}
              className={`h-full w-full object-cover`}
            />
          );
        })}
      </section>
    </>
  );
}
