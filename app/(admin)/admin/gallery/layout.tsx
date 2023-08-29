import { verifyToken } from "@/lib/firebase/admin/auth";

export const dynamic = "force-dynamic";
export const revalidate = process.env.NODE_ENV === "development" ? false : 0;

type PropTypes = {
  children: React.ReactNode;
};

export default async function Layout({ children }: PropTypes) {
  await verifyToken();

  return <>{children}</>;
}
