import { Welcome } from "@components/admin/home/Welcome";
import { Stats } from "@components/admin/home/Stats";

import lazy from "next/dynamic";

const Table = lazy(() => import("@components/admin/home/Table"), { ssr: false });

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminPage() {
  return (
    <div>
      <Welcome />
      <Table />
      <Stats />
    </div>
  );
}
