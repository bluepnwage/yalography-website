import { Section } from "@components/shared";

import prisma from "@lib/prisma";

async function getImages() {
  await prisma.$connect();
  const images = await prisma.images.findMany();
  await prisma.$disconnect();
  return images;
}

export async function Gallery() {
  const images = await getImages();
  return (
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
  );
}
