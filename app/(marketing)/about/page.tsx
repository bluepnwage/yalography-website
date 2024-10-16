//Components
import { Section } from '@/components/shared';
import { SkillDetail } from '@/components/about';
import myFont from '@/lib/menlo-font';
import { Title } from '@aomdev/ui';

//Assets
import yasmino from '@/public/yalo-2.jpg';
import villa from '@/public/about/villa-md.jpg';
import tj from '@/public/about/tj-project-md.jpg';
import about from '@/public/about/about-md.jpg';
import sxmOffice from '@/public/about/k.jpg';

import type { Metadata } from 'next';
import { BlurImage } from '@/components/blur-image';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'About'
};

export default function AboutPage() {
  return (
    <>
      <section className="flex flex-col lg:flex-row w-11/12 lg:container justify-between  mx-auto mt-10 lg:mt-20  mb-20 lg:mb-48">
        <div className="basis-1/2 grow">
          <header className="space-y-2 mb-5 text-center lg:text-start">
            <Title
              order={1}
              className={`text-base ${myFont.className} uppercase text-primary-500 dark:text-primary-400`}
            >
              About us
            </Title>
            <Title
              order={2}
              className="font-heading font-medium text-4xl text-gray-900 dark:text-white"
            >
              Capturing the Beauty of the World
            </Title>
          </header>
          <figure className="overflow-hidden rounded-md lg:hidden my-10">
            <BlurImage
              src={yasmino}
              alt=""
              placeholder="blur"
            />
          </figure>
          <p className="[lg:width:clamp(36ch,90%,65ch)] text-lg leading-loose text-gray-700 dark:text-gray-200">
            I am a self-taught photographer who has been taking photos since I was a teenager. Growing up, I
            was always drawn to the beauty of nature and the way that a camera could capture it. I quickly
            became obsessed with taking photos and learning as much as I could about photography. I have been
            honing my craft ever since, learning through both trial and error and taking courses to further my
            knowledge. I have a passion for portrait photography, as well as capturing candid moments and
            telling stories through my images. I am constantly striving to create unique and captivating
            photos that will inspire and move others.
          </p>
          <span className="font-medium text-lg block mt-6">Some of my skills include:</span>
          <ul className="mt-4 list-disc list-inside space-y-2">
            <li>Adobe Photoshop</li>
            <li>Adobe Lightroom</li>
            <li>Photoshop</li>
          </ul>
        </div>
        <div className="hidden lg:block lg:basis-2/5">
          <figure className="  overflow-hidden rounded-md ml-auto  w-3/4">
            <BlurImage
              src={yasmino}
              alt=""
              placeholder="blur"
            />
          </figure>
        </div>
      </section>

      <Section
        margin={false}
        className={`svg-background py-24 border-t border-b border-zinc-200 dark:border-zinc-700`}
      >
        <div className={'grid-cols-6 lg:grid-cols-2 w-11/12 lg:container lg:gap-36'}>
          <SkillDetail
            img={villa}
            title="Capturing"
            subTitle="Capturing the best possible photographs"
          >
            This requires a combination of technical skills and creativity. It starts with understanding the
            basics of composition, lighting, and exposure, as well as knowing how to use your camera and
            lenses. But it also involves being able to anticipate and seize the right moment, and having a
            keen eye for detail and aesthetics. It&apos;s important to be prepared for any situation and to be
            able to think on your feet. Always be open to experimentation and trying new things. And, most
            importantly, always be in the right mindset, and be willing to put in the time and effort to get
            the perfect shot.
          </SkillDetail>
          <SkillDetail
            img={tj}
            title="Editing"
            subTitle="Editing is an essential and timeless process"
          >
            Editing is necessary to achieve the best possible result in photography. It allows you to refine
            your images, correct any imperfections and enhance the overall look and feel of the photograph.
            It&apos;s a process that requires attention to detail and a good understanding of color, contrast,
            and tone. Whether you&apos;re using Lightroom, Photoshop or any other software, it&apos;s
            important to be familiar with the features and how to use them effectively. With editing, you can
            bring out the best in your images and make them truly stand out. It&apos;s an ongoing process that
            takes time and patience.
          </SkillDetail>
          <SkillDetail
            img={about}
            title="Your brand"
            subTitle="Enhance your brand image"
          >
            Yalography offers a range of services to enhance your brand image through professional
            photography. Our team is comprised of experienced photographers, MUAs and Hair dressers that can
            capture stunning images that showcase your products, services, and brand story. We understand the
            importance of visual content in today&apos;s digital age and how it can impact the success of your
            business. From product photography to lifestyle and event photography, we have the skills and
            expertise to create high-quality, engaging content that will help your brand stand out. With
            Yalography&apos;s services, you can be sure that your brand image will be elevated to new heights
            and leave a lasting impression on your audience.
          </SkillDetail>
          <SkillDetail
            img={sxmOffice}
            title="Our partner"
            subTitle="Your hair matters"
          >
            Nicky Hair Tech is our premier partner for all your hair styling needs. With a team of experienced
            and highly skilled hair stylists, Nicky Hair Tech is committed to providing exceptional services
            that help their clients look and feel their best. Nicky Hair Tech has the expertise and creativity
            to bring your vision to life. With a focus on customer satisfaction and a passion for delivering
            the best results, Nicky Hair Tech is the perfect partner for anyone seeking top-quality hair
            styling services for the perfect photoshoot.
          </SkillDetail>
        </div>
      </Section>
      <ContactForm />
    </>
  );
}
