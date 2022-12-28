import { Title } from "@components/shared";
import dynamic from "next/dynamic";

export function generateStaticParams() {
  return [{ status: "pending" }, { status: "approved" }];
}

const Table = dynamic(() => import("@components/admin/reservations/Table"), { ssr: false });

export default function BookingsPage({ params }: { params: { status: "approved" | "pending" } }) {
  return (
    <>
      <Title className="mb-10 first-letter:capitalize">{params.status} reservations</Title>
      <Table status={params.status} />
    </>
  );
}