import { ThemeIcon, Card } from "@components/shared";

export function Skill() {
  return (
    <Card
      gradientBorder
      containerStyles="col-span-full lg:col-span-1 lg:last-of-type:col-span-full rounded-md"
      className="flex items-center gap-2 h-full w-full rounded-md"
    >
      <ThemeIcon>Hello</ThemeIcon>
      <p>Adobe photoshop</p>
    </Card>
  );
}
