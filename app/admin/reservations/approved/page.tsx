const array = Array(35).fill(null);
import { Table } from "@components/admin/reservations/approved/Table";

export default function AcceptedReservationsPage() {
  return (
    <>
      <h1 className="font-bold text-4xl mb-10">Accepted Reservations</h1>
      <Table reservations={array} />
    </>
  );
}
