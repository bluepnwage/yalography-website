import { Section, Title } from "@components/shared";

export function Intro() {
  return (
    <Section margin="mb-0" className={`svg-background text-center py-10 border-b border-zinc-700`}>
      <Title className="text-4xl lg:text-6xl text-center">
        See how we deliver the <br />
        <span className="bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent">
          best photoshoots
        </span>
        <br />
        SXM has to offer
      </Title>
    </Section>
  );
}
