//Components
import { PageIntro } from "@components/PageIntro";
import { Grid, Section, Title } from "@components/shared";
import { SkillDetail, Company, Skill } from "@components/about";
import { Button } from "@components/shared/Button";
import Image from "next/image";

//Assets
import gigaChad from "@public/giga-chad.jpg";

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
        <Grid lg={2}>
          <article className="lg:pr-10 col-span-full lg:col-span-1">
            <header className="space-y-2 mb-5">
              <Title order="h2" size={"md"} color="red">
                About us
              </Title>
              <Title order="h3">Capturing the Beauty of the World</Title>
            </header>
            <p className="text-lg">
              I am a self-taught photographer who has been taking photos since I was a teenager. Growing up, I was
              always drawn to the beauty of nature and the way that a camera could capture it. I quickly became obsessed
              with taking photos and learning as much as I could about photography. I have been honing my craft ever
              since, learning through both trial and error and taking courses to further my knowledge. I have a passion
              for portrait photography, as well as capturing candid moments and telling stories through my images. I am
              constantly striving to create unique and captivating photos that will inspire and move others.
            </p>
            <strong className="block my-4">Some of my skills include:</strong>
            <Grid lg={2} className="w-full">
              <Skill />
              <Skill />
              <Skill />
            </Grid>
          </article>
          <figure className="bg-red-600 w-full h-full col-span-full lg:col-span-1">
            <Image src={gigaChad} alt={""} className="w-full h-full" />
          </figure>
        </Grid>
      </Section>
      <Section margin={false} className="bg-gray-50 dark:bg-zinc-800 px-5 py-16">
        <div className="w-full gap-5 flex ">
          <div className="basis-3/5 grow pr-5 space-y-4">
            <Title order={"h2"}>The world&apos;s most innovative companies use Yalography</Title>
            <p className="text-xl">
              My experience and passion for photography have allowed me to create stunning images and to help these
              companies tell their stories in an impactful way. I strive to provide the best services to my clients and
              I am committed to delivering results that exceed their expectations.
            </p>
            <Button component={"a"} href={"/"} className="py-4 px-6">
              Contact me
            </Button>
          </div>
          <Grid lg={2} gap={"none"} className="basis-2/5 grow gap-1">
            {companies.map((company, key) => {
              return <Company companyName={company} key={key} />;
            })}
          </Grid>
        </div>
      </Section>
      <Section margin={false} className={`svg-background py-16 border-t border-zinc-200 dark:border-zinc-700`}>
        <Grid lg={1} className={"gap-16 lg:gap-36"}>
          <SkillDetail />
          <SkillDetail />
          <SkillDetail />
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
