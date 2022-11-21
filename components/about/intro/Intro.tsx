import { Section, Title } from "@components/shared";

export function Intro() {
  return (
    <Section margin={false} className={`svg-background py-20 border-b border-zinc-700`}>
      <Title className="text-center">
        Capturing the moments that <br />
        <span className="text-transparent bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text">
          captivate your heart
        </span>
      </Title>
    </Section>
  );
}
