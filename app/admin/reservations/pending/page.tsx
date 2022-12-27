import { Title } from "@components/shared";
import dynamic from "next/dynamic";

const Table = dynamic(() => import("@components/admin/reservations/Table"), { ssr: false });

export default function PendingBookingsPage() {
  return (
    <>
      <Title className="mb-10">Pending reservations</Title>
      <Table status="pending" />
    </>
  );
}
