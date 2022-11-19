import type { IconProps } from "./icons";
import { ThemeIcon } from "@components/shared";
export interface PropTypes {
  Icon: (props: IconProps) => JSX.Element;
  title: string;
}

export function ServiceCard({ Icon, title }: PropTypes) {
  return (
    <div
      style={{ height: 150 }}
      className="col-span-full lg:col-span-4 px-4 bg-zinc-800 rounded-md h-12 flex gap-5 items-center"
    >
      <ThemeIcon aria-hidden>
        <Icon />
      </ThemeIcon>
      <p className="font-semibold text-lg">{title}</p>
    </div>
  );
}
