import { PageIntro } from "@components/PageIntro";
import { Section } from "@components/shared";
import prisma from "@lib/prisma";

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
          {images.map((image, key) => {
            return (
              <figure key={key}>
                <img src={image.url} alt={image.alt || ""} />
              </figure>
            );
          })}
        </div>
      </Section>
    </>
  );
}
