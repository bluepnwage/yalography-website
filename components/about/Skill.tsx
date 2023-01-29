import { ThemeIcon, Card } from "@components/shared";

type PropTypes = {
  label: string;
  Icon: (props: { className?: string; size?: number; fill?: boolean }) => JSX.Element;
};

export function Skill({ label, Icon }: PropTypes) {
  return (
    <Card
      glow
      className="col-span-full lg:col-span-1 lg:last-of-type:col-span-full  flex items-center gap-2 h-full w-full rounded-md"
    >
      <div className="basis-16">
        <ThemeIcon>
          <Icon size={24} className="fill-white" fill />
        </ThemeIcon>
      </div>
      <p>{label}</p>
    </Card>
  );
}
