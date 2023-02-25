import { Nav } from "@components/admin/Nav";
import { verifyToken } from "@lib/firebase/admin/auth";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin"
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await verifyToken();
  return (
    <div>
      <Nav />
      <>
        <div className="w-4/5 ml-auto p-5">{children}</div>
      </>
    </div>
  );
}
