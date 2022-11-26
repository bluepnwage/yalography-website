import { Nav } from "@components/admin/Nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Nav />
      <>
        <div className="w-4/5 ml-auto p-5">{children}</div>
      </>
    </div>
  );
}
