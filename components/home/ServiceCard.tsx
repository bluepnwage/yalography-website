import { ThemeIcon, Card } from "@components/shared";
export interface PropTypes {
  Icon: React.ReactNode;
  title: string;
}

export function ServiceCard({ Icon, title }: PropTypes) {
  return (
    <Card glow className={"col-span-full flex gap-5 items-center lg:col-span-4 rounded-md h-44"}>
      <ThemeIcon aria-hidden>{Icon}</ThemeIcon>
      <p className="font-semibold text-lg">{title}</p>
    </Card>
  );
}
