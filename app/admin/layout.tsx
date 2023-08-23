import { Nav } from "@/components/admin/Nav";
import { AdminCommand } from "@/components/admin/command";
import { verifyToken } from "@/lib/firebase/admin/auth";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin"
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await verifyToken();
  return (
    <div>
      <AdminCommand />
      <Nav />
      <>
        <div className="w-5/6 ml-auto p-5">{children}</div>
      </>
    </div>
  );
}
