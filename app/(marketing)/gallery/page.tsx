import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/shared";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { Gallery } from "@/components/gallery/Gallery";
import { transformImage } from "@/lib/transform-image";

async function getImages() {
  const images = await prisma.resources.findMany();
  const imagePromise = images.map(async (img) => ({
    ...img,
    url: transformImage("w_1500", img.publicId, img.type)
  }));
  return await Promise.all(imagePromise);
}

export const metadata: Metadata = {
  title: "Gallery"
};

export default async function GalleryPage() {
  const images = await getImages();
  return (
    <>
      <PageIntro>
        Captivating Photos: <br /> A{" "}
        <span className="bg-gradient-to-tr from-tertiary-400 to-primary-500 bg-clip-text text-transparent">
          Visual Journey
        </span>{" "}
        <br />
        Through Our Gallery
      </PageIntro>
      <Section className="mt-20">
        <Gallery images={images} />
      </Section>
    </>
  );
}
