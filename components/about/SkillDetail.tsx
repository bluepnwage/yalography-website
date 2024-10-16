import type { StaticImageData } from 'next/image';
import { Title } from '@aomdev/ui';
import myFont from '@/lib/menlo-font';
import { BlurImage } from '../blur-image';
import styles from './styles.module.css';

type PropTypes = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  img: StaticImageData;
};

export function SkillDetail({ children, subTitle, title, img }: PropTypes) {
  return (
    <article
      className={`flex gap-10 flex-col col-span-full lg:col-span-1 lg:flex-row lg:even:flex-row-reverse mb-20 last-of-type:mb-0 group ${styles.container}`}
    >
      <div className="basis-1/2 grow">
        <header className="mb-5 space-y-2 text-center lg:text-start">
          <Title
            order={2}
            className={`text-base ${myFont.className} text-primary-500 dark:text-primary-400`}
          >
            {title}
          </Title>
          <Title
            order={3}
            className="font-heading font-medium text-3xl"
          >
            {subTitle}
          </Title>
        </header>
        <figure className="basis-1/2 grow lg:hidden block mb-10">
          <BlurImage
            src={img}
            className="w-full h-full object-cover"
            alt={''}
          />
        </figure>
        <p className="text-lg text-gray-700 dark:text-gray-200 leading-loose [lg:width:clamp(36ch,90%,65ch)]">
          {children}
        </p>
      </div>
      <figure className="basis-1/2 grow lg:block hidden aspect-video ">
        <BlurImage
          src={img}
          className={`w-full h-full object-cover ${styles.img}`}
          alt={''}
        />
      </figure>
    </article>
  );
}
