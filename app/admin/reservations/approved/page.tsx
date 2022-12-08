const array = Array(35).fill(null);
import { Card, Grid, Anchor } from "@components/shared";
import { Table } from "@components/admin/reservations/approved/Table";
export default function AcceptedReservationsPage() {
  return (
    <>
      <p>Accepted Reservations</p>
      <Table reservations={array} />
    </>
  );
}

function pagination<T>(list: T[], currentPage: number, rowsPerPage: number) {
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const paginatedList = list.slice(indexOfFirst, indexOfLast);
  return { paginatedList, total: Math.ceil(list.length / rowsPerPage), totalItems: list.length };
}
