import { PageIntro } from "@components/PageIntro";
import { Section } from "@components/shared";
import prisma from "@lib/prisma";
import { Image } from "@components/shared/Image";

async function getImages() {
  await prisma.$connect();
  const images = await prisma.images.findMany();
  await prisma.$disconnect();
  return images;
}

export default async function GalleryPage() {
  const images = await getImages();
  return (
    <>
      <PageIntro>
        Captivating Photos: <br /> A{" "}
        <span className="bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent">Visual Journey</span>{" "}
        <br />
        Through Our Gallery
      </PageIntro>
      <Section className="mt-20">
        <div
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gridAutoRows: "240px" }}
          className="grid grid-flow-dense gap-3 w-11/12"
        >
          {images.map((image) => {
            const className =
              image.width / image.height > 1 ? "lg:col-span-2" : image.width / image.height < 1 ? "row-span-2" : "";
            return (
              <Image
                key={image.id}
                width={image.width}
                height={image.height}
                src={image.url}
                alt={""}
                containerClass={`w-full overflow-hidden ${className}`}
                className="w-full h-full object-cover"
              />
            );
          })}
        </div>
      </Section>
    </>
  );
}
