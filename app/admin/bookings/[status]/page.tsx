import { Title } from "@components/shared";
import { verifyToken } from "@lib/firebase/admin/auth";
import dynamic from "next/dynamic";

export function generateStaticParams() {
  return [{ status: "pending" }, { status: "approved" }];
}

const BookingsTable = dynamic(() => import("@components/admin/bookings/BookingsTable"), { ssr: false });

export default async function BookingsPage({ params }: { params: { status: "approved" | "pending" } }) {
  await verifyToken();

  return (
    <>
      <Title className="mb-10 first-letter:capitalize">{params.status} bookings</Title>
      <BookingsTable status={params.status} />
    </>
  );
}
