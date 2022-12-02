import { Welcome } from "@components/admin/home/Welcome";
import { Table } from "@components/admin/home/Table";
import { Stats } from "@components/admin/home/ChartContainer";

export default function AdminPage() {
  return (
    <div>
      <Welcome />
      <Table />
      <Stats />
    </div>
  );
}
