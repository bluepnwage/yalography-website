import { Button, Title, Card } from "@components/shared";
import { ClipboardMoney } from "@lib/icons";
import { Orders, OrdersLoading } from "./Orders";
import { Suspense } from "react";
import { StatCard } from "./StatCard";

export function Welcome() {
  return (
    <div className="flex gap-4 items-stretch mb-20">
      <WelcomeCard />
      <Suspense fallback={<OrdersLoading />}>
        <Orders />
      </Suspense>
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
        You currently have <strong>45</strong> pending bookings.
      </p>
      <Button component="a" href={"/admin/reservations"}>
        View reservations
      </Button>
    </Card>
  );
}
