import { ThemeIcon, Card } from "@components/shared";
export interface PropTypes {
  Icon: React.ReactNode;
  title: string;
}

export function ServiceCard({ Icon, title }: PropTypes) {
  return (
    <Card
      gradientBorder
      containerStyles={"col-span-full lg:col-span-4 rounded-md h-44"}
      className="flex gap-5 items-center w-full h-full"
    >
      <ThemeIcon aria-hidden>{Icon}</ThemeIcon>
      <p className="font-semibold text-lg">{title}</p>
    </Card>
  );
}
