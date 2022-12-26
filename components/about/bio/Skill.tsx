import { ThemeIcon, Card } from "@components/shared";

export function Skill() {
  return (
    <Card
      glow
      className="col-span-full lg:col-span-1 lg:last-of-type:col-span-full  flex items-center gap-2 h-full w-full rounded-md"
    >
      <ThemeIcon>Hello</ThemeIcon>
      <p>Adobe photoshop</p>
    </Card>
  );
}
