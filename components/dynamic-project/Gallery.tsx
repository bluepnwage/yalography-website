import { Grid, Title } from "@components/shared";
import { Image } from "@components/shared/Image";
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
            <Image
              containerClass="col-span-full lg:col-span-4 object-cover"
              key={image.id}
              src={image.url}
              width={image.width}
              height={image.height}
              alt={""}
              className="h-full w-full"
            />
          );
        })}
      </Grid>
    </>
  );
}
