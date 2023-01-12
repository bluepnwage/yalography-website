import { SignInForm } from "@components/signin/SignInForm";
import Image from "next/image";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import pixel from "@public/pixel.jpg";
import admin from "@lib/firebase/admin/config";

export const dynamic = "force-dynamic";

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
    <div style={{ height: "calc(100vh - 64px)" }} className="w-full flex">
      <SignInForm />
      <div className="grow basis-5/6 bg-red-500">
        <Image src={pixel} alt={"pixel art"} className="h-full object-cover" />
      </div>
    </div>
  );
}
