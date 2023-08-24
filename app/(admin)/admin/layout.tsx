import { verifyToken } from "@/lib/firebase/admin/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await verifyToken();

  return <>{children}</>;
}
