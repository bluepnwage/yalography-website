import { Image } from "@/components/shared/Image";
import { transformImage } from "@/lib/transform-image";
import type { Images } from "@prisma/client";
import { Title } from "@aomdev/ui";
import myFont from "@/lib/menlo-font";

type PropTypes = {
  images: Images[];
};

export function Gallery({ images }: PropTypes) {
  // const sortedImages = images.sort(img => {
  //   return img.width / img.height > 1 ? 1 : -1;
  // });
  return (
    <>
      <div className="text-center space-y-2 py-10">
        <Title order={2} className={`text-base ${myFont.className} text-primary-500 dark:text-primary-400`}>
          Gallery
        </Title>
        <Title order={3} className="font-heading font-medium text-5xl text-gray-900 dark:text-gray-50">
          See the images that brought this project to life
        </Title>
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
