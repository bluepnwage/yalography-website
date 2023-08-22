import BookingsTable from "@components/admin/bookings/BookingsTable";
import { Title } from "@components/shared";
import { verifyToken } from "@lib/firebase/admin/auth";
import { notFound } from "next/navigation";

export default async function BookingsPage({ params }: { params: { status: "approved" | "pending" } }) {
  await verifyToken();
  if (params.status !== "approved" && params.status !== "pending") notFound();

  return (
    <>
      <Title className="mb-10 first-letter:capitalize">{params.status} bookings</Title>
      <BookingsTable status={params.status} />
    </>
  );
}
