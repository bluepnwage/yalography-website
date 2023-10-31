import { SignInForm } from "@/components/signin/SignInForm";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import admin from "@/lib/firebase/admin/config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function verifyToken() {
  const nextCookies = cookies();
  const token = nextCookies.get("fb-token");
  let shouldRedirect = false;
  try {
    if (token) {
      await admin.auth().verifyIdToken(token.value);
      shouldRedirect = true;
    }
  } catch (error) {
    shouldRedirect = false;
  }
  return shouldRedirect;
}

export default async function SignInPage() {
  const shouldRedirect = await verifyToken();
  if (shouldRedirect) redirect("/");

  return (
    <div
      style={{ height: "calc(100vh - 64px)" }}
      className="w-full flex flex-col justify-center items-center"
    >
      <SignInForm />
    </div>
  );
}
