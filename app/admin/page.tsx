import { WelcomeStats } from "@/components/admin/home/WelcomeStats";
import { Stats } from "@/components/admin/home/Stats";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <div>
      <WelcomeStats />
      <Stats />
    </div>
  );
}
