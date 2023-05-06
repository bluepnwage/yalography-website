//Components
import { PageIntro } from "@components/PageIntro";
import { Grid, Section, Title } from "@components/shared";
import { SkillDetail, Company, Skill } from "@components/about";
import { Button } from "@components/shared/Button";
import { MovieFilter, AutoFix, PhotoSelectLarge } from "@lib/icons";
import Image from "next/image";

//Assets
import yasmino from "@public/yasmino-lg.jpg";
import villa from "@public/about/villa-md.jpg";
import tj from "@public/about/tj-project-md.jpg";
import about from "@public/about/about-md.jpg";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <>
      <PageIntro>
        Capturing the moments that <br />
        <span className="text-transparent bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text">
          captivate your heart
        </span>
      </PageIntro>
      <Section className="mt-16">
        <Grid className="mx-2 lg:mx-0" lg={2}>
          <article className="lg:pr-10  col-span-full lg:col-span-1">
            <header className="space-y-2 mb-5">
              <Title order="h2" size={"md"} color="red">
                About us
              </Title>
              <Title order="h3">Capturing the Beauty of the World</Title>
            </header>
            <p className="text-lg">
              I am a self-taught photographer who has been taking photos since I was a teenager. Growing up, I
              was always drawn to the beauty of nature and the way that a camera could capture it. I quickly
              became obsessed with taking photos and learning as much as I could about photography. I have
              been honing my craft ever since, learning through both trial and error and taking courses to
              further my knowledge. I have a passion for portrait photography, as well as capturing candid
              moments and telling stories through my images. I am constantly striving to create unique and
              captivating photos that will inspire and move others.
            </p>
            <strong className="block my-4">Some of my skills include:</strong>
            <Grid lg={2} fullWidth>
              <Skill Icon={PhotoSelectLarge} label="Adobe Photoshop" />
              <Skill Icon={AutoFix} label="Adobe Lightroom" />
              <Skill Icon={MovieFilter} label="Adobe Premier Pro" />
            </Grid>
          </article>
          <figure className="bg-red-600 w-full relative col-span-full lg:col-span-1">
            <Image
              src={yasmino}
              fill
              alt={""}
              style={{ objectPosition: "center top" }}
              className="object-cover"
            />
          </figure>
        </Grid>
      </Section>
      <Section margin={false} className="bg-gray-50 dark:bg-zinc-800 px-5 py-16">
        <div className="w-full gap-5 flex-col flex lg:flex-row ">
          <div className="basis-3/5 grow lg:pr-5 space-y-4">
            <Title order={"h2"} className="text-center mb-4 lg:mb-0 lg:text-start">
              The most renowned companies in SXM have worked with Yalography
            </Title>
            <p className="text-xl">
              My experience and passion for photography have allowed me to create stunning images and to help
              these companies tell their stories in an impactful way. I strive to provide the best services to
              my clients and I am committed to delivering results that exceed their expectations.
            </p>
            <Button
              fullWidth
              component={"a"}
              href={"/bookings#contact"}
              className="py-4 px-6 w-full lg:w-fit text-center"
            >
              Contact me
            </Button>
          </div>
          <Grid lg={2} gap={"none"} fullWidth className="basis-2/5 grow gap-1 w-full">
            {companies.map((company, key) => {
              return <Company companyName={company} key={key} />;
            })}
          </Grid>
        </div>
      </Section>
      <Section
        margin={false}
        className={`svg-background py-16 border-t border-zinc-200 dark:border-zinc-700`}
      >
        <Grid lg={1} className={"gap-16 lg:gap-36"}>
          <SkillDetail img={villa} title="Capturing" subTitle="Capturing the best possible photographs">
            This requires a combination of technical skills and creativity. It starts with understanding the
            basics of composition, lighting, and exposure, as well as knowing how to use your camera and
            lenses. But it also involves being able to anticipate and seize the right moment, and having a
            keen eye for detail and aesthetics. It&apos;s important to be prepared for any situation and to be
            able to think on your feet. Always be open to experimentation and trying new things. And, most
            importantly, always be in the right mindset, and be willing to put in the time and effort to get
            the perfect shot.
          </SkillDetail>
          <SkillDetail img={tj} title="Editing" subTitle="Editing is an essential and timeless process">
            Editing is necessary to achieve the best possible result in photography. It allows you to refine
            your images, correct any imperfections and enhance the overall look and feel of the photograph.
            It&apos;s a process that requires attention to detail and a good understanding of color, contrast,
            and tone. Whether you&apos;re using Lightroom, Photoshop or any other software, it&apos;s
            important to be familiar with the features and how to use them effectively. With editing, you can
            bring out the best in your images and make them truly stand out. It&apos;s an ongoing process that
            takes time and patience.
          </SkillDetail>
          <SkillDetail img={about} title="Your brand" subTitle="Enhance your brand image">
            Yalography offers a range of services to enhance your brand image through professional
            photography. Our team is comprised of experienced photographers, MUAs and Hair dressers that can
            capture stunning images that showcase your products, services, and brand story. We understand the
            importance of visual content in today&apos;s digital age and how it can impact the success of your
            business. From product photography to lifestyle and event photography, we have the skills and
            expertise to create high-quality, engaging content that will help your brand stand out. With
            Yalography&apos;s services, you can be sure that your brand image will be elevated to new heights
            and leave a lasting impression on your audience.
          </SkillDetail>
          <SkillDetail title="Our partner" subTitle="Your hair matters">
            Nicky Hair Tech is our premier partner for all your hair styling needs. 
            With a team of experienced and highly skilled hair stylists, Nicky Hair Tech is committed to providing exceptional services that help their clients look and feel their best. 
            Nicky Hair Tech has the expertise and creativity to bring your vision to life. 
            With a focus on customer satisfaction and a passion for delivering the best results, Nicky Hair Tech is the perfect partner for anyone seeking top-quality hair styling services for the perfect photoshoot.
          </SkillDetail>
        </Grid>
      </Section>
    </>
  );
}

const companies = [
  "Tourism Office SXM",
  "Real Estate",
  "Paco Rabanne",
  "SXM Wedding Expo",
  "Valentino Miami",
  "Collectivite"
];
