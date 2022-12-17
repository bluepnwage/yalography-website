import { Card, Grid, Title, Badge, Button, Section } from "@components/shared";
import Image from "next/image";
import pixel from "@public/pixel.jpg";

const array = Array(9).fill(null);

export default function AdminProjectsPage() {
  const date = new Date().toDateString();
  return (
    <>
      <Title order={"h1"} className="mb-5">
        Projects
      </Title>
      <div className="mb-20 flex flex-col items-center">
        <Grid fullWidth>
          <Card className="col-span-6">
            <p className="text-lg">Share your projects with your viewers</p>
          </Card>
          <Card className="col-span-3">Total views: 6</Card>
          <Card className="col-span-3">Total projects: 40</Card>
        </Grid>
      </div>
      <Grid fullWidth>
        <div className="col-span-full">
          <Title order={"h2"}>All projects</Title>
        </div>
        {array.map((_, key) => {
          const published = key % 2 === 0;
          return (
            <Card key={key} className="col-span-4 overflow-hidden">
              <figure className="-mx-4 overflow-hidden h-48 mb-5 -mt-4 ">
                <Image src={pixel} className="w-full h-full object-cover" alt={"Project thumbnail"} />
              </figure>
              <div className="flex justify-between items-center">
                <Title order={"h2"} size={"lg"}>
                  Random title
                </Title>
                <Badge size={"sm"} color={published ? "green" : "orange"}>
                  {published ? "Published" : "Draft"}
                </Badge>
              </div>
              <div className="flex justify-center my-4">
                <Button component={"a"} href={"/admin/projects/random-project"}>
                  View project
                </Button>
              </div>
              <p>{date}</p>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}
