import { Button, Title } from "@components/shared";

export function Welcome() {
  return (
    <div className="flex gap-4 items-stretch">
      <WelcomeCard />
      <StatCard title="Orders completed" stat={87} />
      <StatCard title="Total revenue" stat={"$87k"} />
    </div>
  );
}

function WelcomeCard() {
  return (
    <div className="bg-zinc-800 p-4 space-y-2 rounded-md basis-3/6">
      <Title order={"h1"} size={"xl"}>
        Welcome back Yasmino
      </Title>
      <p>
        You currently have <strong>45</strong> upcoming reservations.
      </p>
      <Button>View reservations</Button>
    </div>
  );
}

interface PropTypes {
  title: string;

  stat: number | string;
}

function StatCard({ stat, title }: PropTypes) {
  return (
    <div className="bg-zinc-800 basis-1/6 grow rounded-md p-4 flex items-center">
      <p className="basis-1/4">Icon</p>
      <div className="basis-3/4 flex flex-col items-end gap-2">
        <p className="text-gray-400">{title}</p>
        <p className="font-bold text-3xl">{stat}</p>
      </div>
    </div>
  );
}
