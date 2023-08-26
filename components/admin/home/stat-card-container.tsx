import { StatCard } from "./stat-card";
import { getOrders } from "@/lib/admin-data";

export async function StatCardContainer() {
  const orders = await getOrders();
  return <StatCard orders={orders} />;
}
