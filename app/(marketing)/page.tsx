//Components
import { Grid, Section } from "@/components/shared";
import { ServiceCard, Stats } from "@/components/home";
import { Ballon, Bouquet, BoxArchive, Globe, Maternity, Person } from "@/lib/icons";
import { Slideshow } from "@/components/home/Slideshow";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Card, Title, ThemeIcon } from "@aomdev/ui";
import { IconMail, IconLocation } from "@tabler/icons-react";
import myFont from "@/lib/menlo-font";

//Assets
import heroImg from "@/public/main-image.jpg";
import photographer from "@/public/yasmino-lg.jpg";
import styles from "./Home.module.css";
import { buttonStyles } from "@aomdev/ui/src/button/styles";

//Types
import type * as Props from "@/components/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: `Preserve the beauty and memories of St. Martin with the expertise of a professional photographer.
   Specializing in capturing stunning landscapes, vibrant culture, and unforgettable moments,
    we offer professional photography services for weddings, maternity, couples, families and travelers. 
    From picturesque beaches to colorful local markets, let us create personalized and lasting memories 
    for you to cherish forever. Whether it's a special event or a milestone,
     our experienced team will help you create stunning photos that will last a lifetime.`
};

export default function HomePage() {
  return (
    <main>
      {/* Hero section */}
      <Section
        className={`${styles.hero} cal svg-background border-b border-zinc-200  duration-200 ease-out dark:border-zinc-700`}
      >
        <div className="grid grid-cols-2 gap-5 h-full items-stretch">
          <div className="flex flex-col justify-center p-5  lg:pl-5 col-span-full lg:col-span-1 ">
            <header className="mb-7">
              <Title order={1} className="font-bold font-heading leading-none tracking-tight">
                Capturing your <br />
                <span
                  className={`bg-gradient-to-tr from-tertiary-400 to-primary-500 bg-clip-text text-transparent`}
                >
                  special moments
                </span>{" "}
              </Title>
            </header>
            <p className="leading-loose mb-8 text-lg">
              Are you looking for a photographer to capture your special moments? Look no further! With my
              years of professional experience and an eye for detail, I can ensure that your photos will be of
              the highest quality and truly capture the beauty of the moment.
            </p>
            <Link href="/bookings" className={buttonStyles({ className: "w-fit", size: "lg" })}>
              Request Session
            </Link>
          </div>
          <figure className="h-full w-full hidden lg:block overflow-hidden col-span-full lg:col-span-1">
            <Image priority src={heroImg} alt={"Official logo"} className="w-full h-full " />
          </figure>
        </div>
      </Section>
      {/* About section */}
      <Section>
        <Grid className="mb-16">
          <figure className="col-span-full lg:col-span-4 bg-red-600">
            <Image src={photographer} alt={""} className="w-full h-full object-cover" />
          </figure>
          <div className="col-span-full lg:col-span-7 p-5">
            <header className="mb-10 space-y-2">
              <Title
                order={2}
                className={`text-base ${myFont.className} text-primary-500 dark:text-primary-400`}
              >
                About
              </Title>
              <Title order={3} className="font-heading font-medium text-5xl text-gray-900 dark:text-gray-50">
                Yalography
              </Title>
            </header>
            <p className="leading-loose text-lg mb-10 dark:text-gray-200">
              Over the past 12 years, my photography journey has been a rollercoaster of learning and growth.
              I&apos;ve had the opportunity to learn new techniques and hone my skills, and I&apos;ve met a
              diverse range of people, from photographers and models to art directors and creative directors.
              These connections have opened doors for me, leading to collaborations with important brands and
              opportunities to attend events such as weddings and the Sxm Food Festival. Each event has been a
              unique experience that has allowed me to develop my craft and expand my portfolio. I&apos;m
              grateful for the opportunities I&apos;ve had and the people I&apos;ve met along the way, and
              I&apos;m excited to see what the next 12 years will bring.
            </p>
            <Stats />
            <Link href="/about" className={buttonStyles({ className: "w-fit", size: "lg" })}>
              Learn more
            </Link>
          </div>
        </Grid>
        <Suspense fallback={null}>
          <Slideshow />
        </Suspense>
      </Section>
      {/* Services section */}
      <Section>
        <header className="space-y-2 mb-10 text-center">
          <Title
            order={2}
            className={`text-base ${myFont.className} text-primary-500  dark:text-primary-400`}
          >
            Services
          </Title>
          <Title order={3} className="font-heading font-medium text-5xl text-gray-900 dark:text-gray-50">
            What we offer
          </Title>
        </header>
        <Grid>
          {serviceTypes.map((service, key) => {
            return <ServiceCard {...service} key={key} />;
          })}
        </Grid>
      </Section>
      {/* Projects section */}
      <Section>
        <div className=" flex flex-col justify-center items-center gap-10   mb-16">
          <header className="text-center space-y-2">
            <Title
              order={2}
              className={`text-base ${myFont.className} text-primary-500 dark:text-primary-400`}
            >
              Projects
            </Title>
            <Title order={3} className="font-heading font-medium text-5xl text-gray-900 dark:text-gray-50">
              Check out some of our works
            </Title>
          </header>
          <Link href={"/projects"} className={buttonStyles({})}>
            View all projects
          </Link>
        </div>
        <div style={{ gridTemplateRows: "repeat(3, 400px)" }} className="grid grid-cols-12 gap-2 container ">
          <Link href={`/projects`} className="col-span-8   relative group overflow-hidden">
            <Image
              src={"/projects/adm-thumbnail.jpg"}
              alt=""
              fill
              className=" object-cover group-hover:scale-105 duration-700 ease-out"
            />
          </Link>
          <Link href={"/projects"} className="col-span-4 row-span-2 relative group overflow-hidden">
            <Image
              src={"/projects/fashion-thumbnail.jpg"}
              alt=""
              fill
              className="object-cover group-hover:scale-105 duration-700 ease-out"
            />
          </Link>
          <Link href={"/projects"} className="col-span-4 row-span-2 relative group overflow-hidden">
            <Image
              src={"/projects/gastro-thumbnail.jpg"}
              alt=""
              fill
              className="group-hover:scale-105 duration-700 ease-out"
            />
          </Link>
          <Link href={"/projects"} className="col-span-4 relative  group overflow-hidden">
            <Image
              src={"/projects/beacon-hill-thumbnail.jpg"}
              alt=""
              fill
              className="group-hover:scale-105 duration-700 ease-out"
            />
          </Link>
          <Link href={"/projects"} className="col-span-8  relative group overflow-hidden">
            <Image
              src={"/projects/class-boutique-thumbnail.jpg"}
              alt=""
              fill
              className="object-cover  [object-position:0%15%] group-hover:scale-105 duration-700 ease-out"
            />
          </Link>
        </div>
      </Section>
      {/* Contact section */}
      <Section
        margin={false}
        className={`svg-background  items-center py-16 border-t border-zinc-200 dark:border-zinc-700`}
      >
        <header className="space-y-2 text-center mb-16">
          <Title order={2} className={`text-base ${myFont.className} text-primary-500 dark:text-primary-400`}>
            Contact
          </Title>
          <Title order={3} className="font-heading font-medium text-5xl text-gray-900 dark:text-gray-50">
            Ready to get in touch?
          </Title>
        </header>
        <Grid>
          <Card className="duration-200 ease-ou flex flex-col items-center justify-center gap-4 col-span-full lg:col-span-3 h-64 w-full">
            <ThemeIcon aria-hidden size={"lg"}>
              <IconMail size={"75%"} />
            </ThemeIcon>
            <p className="font-semibold text-xl">Email</p>
            <address className="text-gray-200">
              <a href="mailto:yalography@gmail.com">yalography@gmail.com</a>
            </address>
          </Card>
          <Card className="duration-200 ease-out flex flex-col items-center gap-4 justify-center col-span-full lg:col-span-3 h-64 w-full">
            <ThemeIcon aria-hidden size={"lg"}>
              <IconLocation size={"75%"} />
            </ThemeIcon>
            <p className="font-semibold text-xl">Address</p>
            <address className="text-gray-200">Marigot, Saint-Martin</address>
          </Card>
          <figure className="bg-white ring-1 overflow-hidden relative  ring-black  ring-opacity-5 dark:ring-0 dark:bg-zinc-800 col-span-full row-start-1 lg:col-span-6  w-full lg:row-span-2">
            <Image src={heroImg} alt={""} fill className="object-cover" />
          </figure>
          <Card className="duration-200 ease-out col-span-6 h-64 w-full gap-4 flex flex-col justify-center items-center">
            <p className="font-bold text-xl">Book a reservation</p>
            <Link className={buttonStyles()} href="/bookings">
              Request a session
            </Link>
          </Card>
        </Grid>
      </Section>
    </main>
  );
}

const serviceTypes: Props.ServiceCardProps[] = [
  { title: "Maternity Photography", Icon: <Maternity className={"stroke-white"} /> },
  { title: "Wedding Photography", Icon: <Bouquet className="fill-white" /> },
  { title: "Commercial Photography", Icon: <Globe className="fill-white" /> },
  { title: "Portrait Photography", Icon: <Person className={"fill-white"} /> },
  { title: "Event Photography", Icon: <Ballon className="stroke-white" /> },
  { title: "Decor Photography", Icon: <BoxArchive className="fill-white" /> }
];
