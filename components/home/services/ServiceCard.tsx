import type { IconProps } from "./icons";
import { ThemeIcon, Card } from "@components/shared";
export interface PropTypes {
  Icon: (props: IconProps) => JSX.Element;
  title: string;
}

export function ServiceCard({ Icon, title }: PropTypes) {
  return (
    <Card className="col-span-full lg:col-span-4 rounded-md h-44 flex gap-5 items-center">
      <ThemeIcon aria-hidden>
        <Icon />
      </ThemeIcon>
      <p className="font-semibold text-lg">{title}</p>
    </Card>
  );
}
