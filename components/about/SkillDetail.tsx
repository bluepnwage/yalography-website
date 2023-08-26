import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Title } from "@aomdev/ui";
import myFont from "@/lib/menlo-font";

type PropTypes = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  img: StaticImageData;
};

export function SkillDetail({ children, subTitle, title, img }: PropTypes) {
  return (
    <article className="flex gap-10 flex-col-reverse col-span-full lg:col-span-1 lg:flex-row lg:even:flex-row-reverse">
      <div className="basis-1/2 grow">
        <header className="mb-5 space-y-2">
          <Title order={2} className={`text-base ${myFont.className} text-primary-500 dark:text-primary-400`}>
            {title}
          </Title>
          <Title order={3} className="font-heading font-medium text-3xl">
            {subTitle}
          </Title>
        </header>
        <p className="text-lg text-gray-200 leading-relaxed">{children}</p>
      </div>
      <figure className="basis-1/2 grow">
        <Image src={img} className="w-full h-full object-cover" alt={""} />
      </figure>
    </article>
  );
}
