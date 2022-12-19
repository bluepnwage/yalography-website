import { Card } from "@components/shared";

interface PropTypes {
  title: string;
  stat: number | string;
  Icon: React.ReactNode;
}

export function StatCard({ stat, title, Icon }: PropTypes) {
  return (
    <Card className="basis-1/6 grow flex items-center">
      <p className="basis-1/4">{Icon}</p>
      <div className="basis-3/4 flex flex-col items-end gap-2">
        <p className="text-gray-400">{title}</p>
        <p className="font-bold text-3xl">{stat}</p>
      </div>
    </Card>
  );
}
