import { Button, Title, Card } from "@components/shared";
import { ClipboardCheck, ClipboardMoney } from "@lib/icons";

export function Welcome() {
  return (
    <div className="flex gap-4 items-stretch mb-20">
      <WelcomeCard />
      <StatCard Icon={<ClipboardCheck size={48} />} title="Orders completed" stat={87} />
      <StatCard Icon={<ClipboardMoney size={48} />} title="Total revenue" stat={"$87k"} />
    </div>
  );
}

function WelcomeCard() {
  return (
    <Card className="space-y-2 basis-3/6">
      <Title order={"h1"} size={"xl"}>
        Welcome back Yasmino
      </Title>
      <p>
        You currently have <strong>45</strong> upcoming reservations.
      </p>
      <Button component="a" href={"/admin/reservations"}>
        View reservations
      </Button>
    </Card>
  );
}

interface PropTypes {
  title: string;
  stat: number | string;
  Icon: React.ReactNode;
}

function StatCard({ stat, title, Icon }: PropTypes) {
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
