const array = Array(35).fill(null);
import { Title } from "@components/shared";
import dynamic from "next/dynamic";

const Table = dynamic(() => import("@components/admin/reservations/Table"), { ssr: false });

export default function AcceptedReservationsPage() {
  return (
    <>
      <Title className="mb-10">Accepted Reservations</Title>
      <Table status="approved" />
    </>
  );
}
