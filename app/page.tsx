//Components
import { Grid, Section, ThemeIcon, Title } from "@components/shared";
import { Button } from "@components/shared/Button";
import { Project, ServiceCard, Stats } from "@components/home";
import { Ballon, Bouquet, BoxArchive, Email, Globe, Location, Maternity, Person } from "@lib/icons";
import Image from "next/image";

import prisma from "@lib/prisma";

//Assets
import heroImg from "@public/main-image.jpg";
import photographer from "@public/photographer-lg.jpg";
import model from "@public/model2-sm.jpg";
import wedding from "@public/wedding-md.jpg";
import pixel from "@public/pixel.jpg";
import airport from "@public/airport-md.jpg";
import bgImage from "@public/bg.jpg";
import styles from "./Home.module.css";

//Types
import type * as Props from "@components/home";

const getProjects = async () => {
  await prisma.$connect();
  const projects = await prisma.projects.findMany({
    where: { pinned: true },
    select: { id: true, thumbnail: true, title: true }
  });
  await prisma.$disconnect();
  return projects;
};

export type PinnedProject = Awaited<ReturnType<typeof getProjects>>[0];

export default async function HomePage() {
  const projects = await getProjects();
  return (
    <main>
      {/* Hero section */}
      <Section
        className={`${styles.hero} cal svg-background border-b border-zinc-200 bg-white dark:bg-zinc-900 duration-200 ease-out dark:border-zinc-700`}
      >
        <div className="grid grid-cols-2 gap-5 h-full items-stretch">
          <div className="flex flex-col justify-center p-5 text-center lg:pl-5 col-span-full lg:col-span-1 ">
            <header className="mb-7">
              <Title className="text-6xl">
                Capturing your <br />
                <span className={`bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent`}>
                  special moments
                </span>{" "}
              </Title>
            </header>
            <p className="leading-loose mb-4 text-xl">
              Are you looking for a photographer to capture your special moments? Look no further! With my years of
              professional experience and an eye for detail, I can ensure that your photos will be of the highest
              quality and truly capture the beauty of the moment.
            </p>
            <Button href="/bookings" component="a" className="block mx-auto">
              Request Session
            </Button>
          </div>
          <figure className="h-full w-full hidden lg:block overflow-hidden col-span-full lg:col-span-1">
            <Image priority src={heroImg} alt={"Official logo"} className="w-full h-full " />
          </figure>
        </div>
      </Section>
      {/* About section */}
      <Section>
        <Grid>
          <figure className="col-span-full lg:col-span-4 bg-red-600">
            <Image src={photographer} alt={""} className="w-full h-full" />
          </figure>
          <div className="col-span-full lg:col-span-7 p-5">
            <header className="mb-7 space-y-2">
              <Title order={"h2"} color="red" size={"md"}>
                About
              </Title>
              <Title order={"h3"} className="text-3xl">
                Yalography
              </Title>
            </header>
            <p className="leading-loose text-lg mb-10">
              My journey as a photographer began when I was a young teen, and I have been exploring the world of
              photography ever since. Over the years, I have had the privilege to work with some of the most renowned
              companies in the Caribbean. I have honed my skills to capture the beauty of the world, with the goal of
              helping others to appreciate its wonders. I am now proud to offer my services as a photographer, and I
              look forward to working with you.
            </p>
            <Stats />
            <Button href="/about" component="a" className="mx-auto block">
              Learn more
            </Button>
          </div>
        </Grid>
      </Section>
      {/* Services section */}
      <Section>
        <header className="space-y-2 mb-10 text-center">
          <Title order={"h2"} color="red" size={"md"}>
            Services
          </Title>
          <Title order={"h3"}>What we offer</Title>
        </header>
        <Grid>
          {serviceTypes.map((service, key) => {
            return <ServiceCard {...service} key={key} />;
          })}
        </Grid>
      </Section>
      {/* Projects section */}
      <Section>
        <Grid className="grid-rows-5 lg:grid-rows-3">
          <div className="bg-white ring-1 ring-black ring-opacity-5 dark:ring-0 dark:bg-zinc-800 col-span-full lg:col-span-4 p-4 h-64 flex flex-col justify-center items-center gap-10">
            <header className="text-center space-y-2">
              <Title color={"red"} order={"h2"} size={"md"}>
                Projects
              </Title>
              <Title order={"h3"}>Check out some of our works</Title>
            </header>
            <Button component="a" href={"/projects"}>
              View all projects
            </Button>
          </div>
          {projects.map((proj) => {
            return <Project project={proj} key={proj.id} />;
          })}
        </Grid>
      </Section>
      {/* Contact section */}
      <Section
        margin={false}
        className={`svg-background bg-gray-50 dark:bg-transparent items-center py-16 border-t border-zinc-200 dark:border-zinc-700`}
      >
        <header className="space-y-2 text-center mb-16">
          <Title color="red" order={"h2"} size={"md"}>
            Contact
          </Title>
          <Title order="h3">Ready to get in touch?</Title>
        </header>
        <Grid>
          <div className="bg-white ring-1 duration-200 ease-out ring-black ring-opacity-5 dark:ring-0 dark:bg-zinc-800 flex flex-col items-center justify-center gap-4 col-span-full lg:col-span-3 h-64 w-full">
            <ThemeIcon aria-hidden>
              <Email className="fill-gray-100" />
            </ThemeIcon>
            <p className="font-semibold text-xl">Email</p>
            <address>
              <a href="mailto:yalography@gmail.com">yalography@gmail.com</a>
            </address>
          </div>
          <div className="bg-white ring-1 duration-200 ease-out ring-black ring-opacity-5 dark:ring-0 dark:bg-zinc-800 flex flex-col items-center gap-4 justify-center col-span-full lg:col-span-3 h-64 w-full">
            <ThemeIcon aria-hidden>
              <Location className="fill-gray-100" />
            </ThemeIcon>
            <p className="font-semibold text-xl">Address</p>
            <address>Marigot, Saint-Martin</address>
          </div>
          <figure className="bg-white ring-1  ring-black  ring-opacity-5 dark:ring-0 dark:bg-zinc-800 col-span-full row-start-1 lg:col-span-6  w-full h-full lg:row-span-2">
            <Image src={bgImage} alt={""} className="h-full w-full object-cover" />
          </figure>
          <div className="bg-white ring-1 duration-200 ease-out ring-black ring-opacity-5 dark:ring-0 dark:bg-zinc-800 col-span-6 h-64 w-full gap-4 flex flex-col justify-center items-center">
            <p className="font-bold text-xl">Book a reservation</p>
            <Button component="a" href="/bookings">
              Request a session
            </Button>
          </div>
        </Grid>
      </Section>
    </main>
  );
}

const serviceTypes: Props.ServiceCardProps[] = [
  { title: "Maternity Photography", Icon: <Maternity className={"stroke-gray-100"} /> },
  { title: "Wedding Photography", Icon: <Bouquet className="fill-gray-100" /> },
  { title: "Commercial Photography", Icon: <Globe className="fill-gray-100" /> },
  { title: "Portrait Photography", Icon: <Person className={"fill-gray-100"} /> },
  { title: "Event Photography", Icon: <Ballon className="stroke-gray-100" /> },
  { title: "Decor Photography", Icon: <BoxArchive className="fill-gray-100" /> }
];
