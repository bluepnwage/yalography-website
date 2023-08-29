import { Card, ThemeIcon } from "@aomdev/ui";

export interface PropTypes {
  Icon: React.ReactNode;
  title: string;
}

export function ServiceCard({ Icon, title }: PropTypes) {
  return (
    <Card className={"col-span-full flex gap-5 items-center lg:col-span-4  h-44"}>
      <ThemeIcon aria-hidden size={"xl"} className="rounded-full">
        {Icon}
      </ThemeIcon>
      <p className="font-medium text-lg">{title}</p>
    </Card>
  );
}
