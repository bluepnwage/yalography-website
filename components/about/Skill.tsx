import { Card, ThemeIcon } from "@aomdev/ui";

type PropTypes = {
  label: string;
  Icon: (props: { className?: string; size?: number; fill?: boolean }) => JSX.Element;
};

export function Skill({ label, Icon }: PropTypes) {
  return (
    <Card className="col-span-full lg:col-span-1 lg:last-of-type:col-span-full  flex items-center gap-2 h-full w-full ">
      <div className="basis-16">
        <ThemeIcon size={"lg"}>
          <Icon size={24} className="fill-white" />
        </ThemeIcon>
      </div>
      <p>{label}</p>
    </Card>
  );
}
