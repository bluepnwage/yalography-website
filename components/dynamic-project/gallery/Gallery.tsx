import { Grid, Title } from "@components/shared";
import Image from "next/image";
import pixel from "@public/pixel2.jpg";

export function Gallery() {
  const images = Array(9).fill(null);
  return (
    <>
      <div className="text-center space-y-2 py-10">
        <Title order={"h2"} color={"red"} size={"md"}>
          Gallery
        </Title>
        <Title order={"h3"}>See the images that brought this project to life</Title>
      </div>
      <Grid fullWidth>
        {images.map((_, key) => {
          return (
            <Image
              key={key}
              width={50}
              height={50}
              src={pixel}
              alt={""}
              className="col-span-full lg:col-span-4 object-contain"
            />
          );
        })}
      </Grid>
    </>
  );
}
