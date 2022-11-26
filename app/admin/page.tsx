import { Welcome } from "@components/admin/home/Welcome";
import { Table } from "@components/admin/home/Table";
// import { Chart } from "@components/admin/home/Chart";
import { ChartContainer } from "@components/admin/home/ChartContainer";
export default function AdminPage() {
  return (
    <div>
      <Welcome />
      <Table />
      <ChartContainer />
    </div>
  );
}
