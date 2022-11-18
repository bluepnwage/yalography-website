import type { IconProps } from "./icons";
import { bgGradient } from "@lib/gradient";
export interface PropTypes {
  Icon: (props: IconProps) => JSX.Element;
  title: string;
}

export function ServiceCard({ Icon, title }: PropTypes) {
  return (
    <div style={{ height: 150 }} className="col-span-4 px-4 bg-zinc-800 rounded-md h-12 flex gap-5 items-center">
      <div aria-hidden className={`flex justify-center items-center rounded-full w-12 h-12 ${bgGradient}`}>
        {<Icon />}
      </div>
      <p className="font-semibold text-lg">{title}</p>
    </div>
  );
}
