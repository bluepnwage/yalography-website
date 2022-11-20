import { Section } from "@components/shared";
import styles from "./Intro.module.css";

export function Intro() {
  return (
    <Section margin="mb-0" className={`${styles.section} text-center py-10 border-b border-zinc-700`}>
      <h1 className="font-bold text-4xl lg:text-6xl text-center ">
        See how we deliver the <br />
        <span className="bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent">
          best photoshoots
        </span>
        <br />
        SXM has to offer
      </h1>
    </Section>
  );
}
