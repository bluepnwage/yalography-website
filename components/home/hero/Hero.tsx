import { Button, Section, Title } from "@components/shared";
import Image from "next/image";
import heroImg from "@public/main-image.jpg";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <Section
      className={`${styles.hero} svg-background border-b border-zinc-200 bg-white dark:bg-zinc-900 duration-200 ease-out dark:border-zinc-700`}
    >
      <div className="grid grid-cols-2 gap-5 h-full items-stretch">
        <div className="flex flex-col justify-center p-5 lg:pl-5 col-span-full lg:col-span-1 ">
          <header className="mb-7">
            <Title className="text-6xl">
              Capturing your <br />
              <span className={`bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent`}>
                special moments
              </span>{" "}
            </Title>
          </header>
          <p className="leading-loose mb-4 text-xl">
            Magna in sit ea aliquip nostrud ex nostrud in dolore Lorem aliquip ut. Anim quis consequat nisi
            reprehenderit consequat. Ipsum cillum consequat consectetur qui adipisicing. Incididunt do commodo
            incididunt excepteur tempor enim non incididunt magna cupidatat.
          </p>
          <Button fullWidth>Request Session</Button>
        </div>
        <figure className="h-full w-full hidden lg:block overflow-hidden col-span-full lg:col-span-1">
          <Image priority src={heroImg} alt={"Official logo"} className="w-full h-full " />
        </figure>
      </div>
    </Section>
  );
}
