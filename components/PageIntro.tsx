import { Section, Title } from "./shared";

type PropTypes = {
  children: React.ReactNode;
};

export function PageIntro({ children }: PropTypes) {
  return (
    <Section margin={false} className={`svg-background py-20 border-b border-zinc-200 dark:border-zinc-700`}>
      <Title className="text-center">{children}</Title>
    </Section>
  );
}
