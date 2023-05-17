import { PageIntro } from "@components/PageIntro";
import { Section } from "@components/shared";
import prisma from "@lib/prisma";
// import { Image } from "@components/shared/Image";
import { Metadata } from "next";
import { Gallery } from "@components/gallery/Gallery";
import { listImages, transform } from "@lib/cloud";
import Image from "next/image";

async function getImages() {
  await prisma.$connect();
  const images = await prisma.images.findMany();
  await prisma.$disconnect();
  return images;
}

export const metadata: Metadata = {
  title: "Gallery"
};

export default async function GalleryPage() {
  // const images = await getImages();
  const images = await listImages();
  return (
    <>
      <PageIntro>
        Captivating Photos: <br /> A{" "}
        <span className="bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent">
          Visual Journey
        </span>{" "}
        <br />
        Through Our Gallery
      </PageIntro>
      <Section className="mt-20">
        {/* <Gallery images={images} /> */}
        <div style={{ gridAutoFlow: "dense" }} className="grid grid-cols-2 gap-2 w-[90%]">
          {images.map(img => {
            return (
              <img
                key={img.public_id}
                alt={""}
                className={`${img.width - img.height > 1 ? "col-span-2" : "row-span-2"}`}
                // width={720}
                // height={480}
                src={transform("w_2000", img.public_id, img.format)}
              />
            );
          })}
        </div>
      </Section>
    </>
  );
}
