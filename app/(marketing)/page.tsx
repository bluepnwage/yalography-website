//Components
import { Grid, Section } from '@/components/shared';
import { Stats, Services } from '@/components/home';
import Link from 'next/link';
import { Title, Button } from '@aomdev/ui';
import myFont from '@/lib/menlo-font';
import { BackgroundImage } from '@/components/home/hero-image';
import { Suspense } from 'react';
import banner from '@/public/yalo-banner.jpg';
import Image from 'next/image';

//Assets
import photographer from '@/public/yasmino-lg.jpg';
import { buttonStyles } from '@aomdev/ui/src/button/styles';

//Types
import type { Metadata } from 'next';
import { BlurImage } from '@/components/blur-image';
import { BookSession } from '@/components/book-session/book-session';

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
      <div className="relative hidden lg:block lg:h-[720px]">
        <Image
          src={banner}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      {/* Hero section */}
      <BackgroundImage>
        <header className="mb-10 relative z-[10]">
          <Title
            order={1}
            className="font-bold text-5xl lg:text-8xl text-center font-heading leading-none text-white tracking-tight"
          >
            Capturing your <br />
            <span
              className={`bg-gradient-to-tr from-tertiary-400 to-primary-500 bg-clip-text text-transparent`}
            >
              special moments
            </span>{' '}
          </Title>
        </header>
        <p className="leading-loose w-11/12 z-[10] mb-10 text-lg lg:text-xl text-gray-200 text-center mx-auto lg:[width:clamp(36ch,90%,70ch)] relative">
          Are you looking for a photographer to capture your special moments? Look no further! With my years
          of professional experience and an eye for detail, I can ensure that your photos will be of the
          highest quality and truly capture the beauty of the moment.
        </p>
        <div className="flex justify-center">
          <BookSession buttonSize={'lg'} />
        </div>
      </BackgroundImage>
      {/* About section */}
      <Section>
        <Grid className="mb-16">
          <figure className="col-span-full lg:col-span-4">
            <BlurImage
              src={photographer}
              alt={''}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="col-span-full lg:col-span-7 lg:p-5">
            <header className="mb-10 space-y-2">
              <Title
                order={2}
                className={`text-base ${myFont.className} uppercase text-primary-500 dark:text-primary-400`}
              >
                About
              </Title>
              <Title
                order={3}
                className="font-heading font-medium text-5xl text-gray-900 dark:text-gray-50"
              >
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
            <Link
              href="/about"
              className={buttonStyles({ className: 'w-fit mx-auto block lg:mx-0', size: 'lg' })}
            >
              Learn more
            </Link>
          </div>
        </Grid>
      </Section>
      {/* Services section */}
      <div className="w-11/12 h-[600px] lg:h-[726px]  flex gap-20 mb-64 mx-auto">
        <Suspense fallback={null}>
          <Services>
            <Title
              order={2}
              className={`text-base ${myFont.className} uppercase text-primary-500  dark:text-primary-400`}
            >
              Services
            </Title>
          </Services>
        </Suspense>
      </div>
      {/* Projects section */}
      <Section>
        <Suspense fallback={null}>
          <div className=" flex flex-col justify-center items-center gap-10   mb-16">
            <header className="text-center space-y-2">
              <Title
                order={2}
                className={`text-base ${myFont.className} uppercase text-primary-500 dark:text-primary-400`}
              >
                Projects
              </Title>
              <Title
                order={3}
                className="font-heading font-medium text-5xl text-gray-900 dark:text-gray-50"
              >
                Check out some of our works
              </Title>
            </header>
            <Link
              href={'/projects'}
              className={buttonStyles({})}
            >
              View all projects
            </Link>
          </div>
          <div
            style={{ gridTemplateRows: 'repeat(3, 400px)' }}
            className="grid grid-cols-6 lg:grid-cols-12 gap-4 container mx-auto w-11/12 "
          >
            <Link
              aria-label="View projects"
              href={`/projects`}
              className="col-span-full lg:col-span-8 rounded-md   relative group overflow-hidden"
            >
              <BlurImage
                src={'/projects/adm-thumbnail.jpg'}
                alt=""
                fill
                className=" object-cover group-hover:scale-105 duration-700 ease-out"
              />
            </Link>
            <Link
              aria-label="View projects"
              href={'/projects'}
              className="col-span-full hidden lg:block lg:col-span-4 row-span-2 rounded-md relative group overflow-hidden"
            >
              <BlurImage
                src={'/projects/fashion-thumbnail.jpg'}
                alt=""
                fill
                className="object-cover group-hover:scale-105 duration-700 ease-out"
              />
            </Link>
            <Link
              aria-label="View projects"
              href={'/projects'}
              className="col-span-full hidden lg:block lg:col-span-4 row-span-2 rounded-md relative group overflow-hidden"
            >
              <BlurImage
                src={'/projects/gastro-thumbnail.jpg'}
                alt=""
                fill
                className="group-hover:scale-105 duration-700 ease-out"
              />
            </Link>
            <Link
              aria-label="View projects"
              href={'/projects'}
              className="col-span-full lg:col-span-4 rounded-md relative  group overflow-hidden"
            >
              <BlurImage
                src={'/projects/beacon-hill-thumbnail.jpg'}
                alt=""
                fill
                className="group-hover:scale-105 duration-700 ease-out"
              />
            </Link>
            <Link
              aria-label="View projects"
              href={'/projects'}
              className="col-span-full lg:col-span-8 rounded-md  relative group overflow-hidden"
            >
              <BlurImage
                src={'/projects/class-boutique-thumbnail.jpg'}
                alt=""
                fill
                className="object-cover  [object-position:0%15%] group-hover:scale-105 duration-700 ease-out"
              />
            </Link>
          </div>
        </Suspense>
      </Section>
      {/* Contact section */}
      <section className="   flex flex-col items-center mt-52  mb-36">
        <Title
          order={2}
          className="font-heading font-medium text-4xl lg:text-5xl text-gray-900 dark:text-gray-50 mb-7"
        >
          Start your journey
        </Title>
        <p className="mb-8 text-xl w-11/12 lg:[width:clamp(36ch,90%,65ch)] text-center text-gray-600 dark:text-gray-200">
          Reprehenderit pariatur aliqua Lorem adipisicing excepteur sint officia nulla. Et sint sit id sit
          officia irure aliquip sit aliquip ad.
        </p>
        <BookSession buttonSize={'md'} />
      </section>
    </main>
  );
}
