import { verifyToken } from "@/lib/firebase/admin/auth";

type PropTypes = {
  children: React.ReactNode;
};

export default async function Layout({ children }: PropTypes) {
  await verifyToken();

  return <>{children}</>;
}
