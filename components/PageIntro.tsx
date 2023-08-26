import { Section } from "./shared";
import { Title } from "@aomdev/ui";
type PropTypes = {
  children: React.ReactNode;
};

export function PageIntro({ children }: PropTypes) {
  return (
    <Section
      margin={false}
      className={`svg-background py-20 leading-none border-b border-zinc-200 dark:border-zinc-700`}
    >
      <Title order={1} className="text-center font-bold font-heading text-gray-900 dark:text-gray-50 ">
        {children}
      </Title>
    </Section>
  );
}
