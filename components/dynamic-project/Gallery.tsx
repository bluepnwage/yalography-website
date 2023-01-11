import { Grid, Title } from "@components/shared";
import Image from "next/image";
import pixel from "@public/pixel2.jpg";
import { Images } from "@prisma/client";

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
      <Grid fullWidth>
        {images.map((image) => {
          return (
            <Image key={image.id} src={image.url} alt={""} className="col-span-full lg:col-span-4 object-contain" />
          );
        })}
      </Grid>
    </>
  );
}
