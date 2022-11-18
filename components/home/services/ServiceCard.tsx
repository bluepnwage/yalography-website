import type { IconProps } from "./icons";

export interface PropTypes {
  Icon: (props: IconProps) => JSX.Element;
  title: string;
}

export function ServiceCard({ Icon, title }: PropTypes) {
  return (
    <div style={{ height: 150 }} className="col-span-4 px-4 bg-zinc-800 rounded-md h-12 flex gap-5 items-center">
      <div
        aria-hidden
        className="from-rose-600 flex justify-center items-center  bg-gradient-to-tr rounded-full to-red-600 w-12 h-12"
      >
        {<Icon />}
      </div>
      <p className="font-semibold text-lg  ">{title}</p>
    </div>
  );
}
