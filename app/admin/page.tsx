import { Welcome } from "@components/admin/home/Welcome";
import { Stats } from "@components/admin/home/Stats";

export default async function AdminPage() {
  return (
    <div>
      <Welcome />
      <Stats />
    </div>
  );
}
