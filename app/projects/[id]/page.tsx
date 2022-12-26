//Components
import { Gallery } from "@components/dynamic-project";
import { Section, Title, Breadcrumbs, Anchor, Grid, Card } from "@components/shared";
import Image from "next/image";

//Assets
import pixel from "@public/pixel.jpg";

export default function DynamicProjectPage() {
  return (
    <>
      <div className="mb-10">
        <Image src={pixel} alt={""} style={{ objectFit: "cover", height: "50vh" }} />
      </div>{" "}
      <Section>
        <div className="w-11/12">
          <Breadcrumbs>
            <Anchor href={"/"}>Home</Anchor>
            <Anchor href={"/projects"}>Projects</Anchor>
            <Anchor href={"/projects/test"}>Project name</Anchor>
          </Breadcrumbs>
          <Title className="mt-20 text-center mb-20">Title for project</Title>
          <Grid lg={2} fullWidth className="mb-10 lg:mb-36">
            <div className="col-span-full lg:col-span-1">
              <header className="mb-5">
                <Title order={"h2"} size={"md"} color={"red"}>
                  Overview
                </Title>
                <Title order={"h3"}>Random title to introduce project</Title>
              </header>
              <p className="text-lg">
                Fugiat culpa officia laboris aute dolore incididunt pariatur Lorem officia. Pariatur esse commodo
                nostrud irure proident sunt proident adipisicing. Ullamco duis est ullamco voluptate commodo laborum
                minim occaecat fugiat dolore sunt amet. Id aliqua amet nisi voluptate.
              </p>
            </div>
            <Card className="col-span-full lg:col-span-1">
              <p className="text-center text-red-600 dark:text-red-500 mb-5">Testimonial</p>
              <p className="text-lg mb-5">
                Consequat laborum tempor laborum enim cillum magna nulla fugiat magna et duis. Ut anim excepteur et
                mollit id deserunt dolore occaecat veniam. Adipisicing deserunt ad ipsum magna id nisi aliqua eiusmod
                incididunt incididunt ea non veniam id. Nisi proident proident et fugiat cupidatat cupidatat
                adipisicing.
              </p>
              <strong>Agis Carty</strong>
              <p className="text-red-600 dark:text-red-500 text-sm mt-5">CEO, Bluepnwage Enterprises</p>
            </Card>
          </Grid>
          <Gallery />
        </div>
      </Section>
    </>
  );
}
