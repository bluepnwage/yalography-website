import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import admin from "./config";

//Use to verify tokens for admin dashboard

export async function verifyToken() {
  const nextCookies = cookies();
  const token = nextCookies.get("fb-token")!;
  try {
    await admin.auth().verifyIdToken(token.value);
  } catch (error) {
    console.error("Token not valid, must sign in");
    notFound();
  }
}
