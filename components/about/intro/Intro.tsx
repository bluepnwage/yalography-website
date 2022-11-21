import { Section, Title } from "@components/shared";

export function Intro() {
  return (
    <Section margin="mb-16" className={`svg-background py-20 border-b border-zinc-700`}>
      <Title order={"h1"} className="text-center text-6xl">
        Capturing the moments that <br />
        <span className="text-transparent bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text">
          captivate your heart
        </span>
      </Title>
    </Section>
  );
}
