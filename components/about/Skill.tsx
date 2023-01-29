import { ThemeIcon, Card } from "@components/shared";

type PropTypes = {
  label: string;
};

export function Skill({ label }: PropTypes) {
  return (
    <Card
      glow
      className="col-span-full lg:col-span-1 lg:last-of-type:col-span-full  flex items-center gap-2 h-full w-full rounded-md"
    >
      <div className="basis-16">
        <ThemeIcon>Hello</ThemeIcon>
      </div>
      <p>{label}</p>
    </Card>
  );
}
