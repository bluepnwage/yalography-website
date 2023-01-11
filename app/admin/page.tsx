import { Welcome } from "@components/admin/home/Welcome";
import { Stats } from "@components/admin/home/Stats";
import { verifyToken } from "@lib/firebase/admin/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  await verifyToken();
  return (
    <div>
      <Welcome />
      <Stats />
    </div>
  );
}
