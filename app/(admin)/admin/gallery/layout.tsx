import { verifyToken } from "@/lib/firebase/admin/auth";
import { GalleryMenu } from "./gallery-menu";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PropTypes = {
  children: React.ReactNode;
};

export default async function Layout({ children }: PropTypes) {
  await verifyToken();

  return (
    <>
      <GalleryMenu />
      {children}
    </>
  );
}
