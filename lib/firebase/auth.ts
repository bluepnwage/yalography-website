import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export async function signIn(email: string, password: string) {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function logOut() {
  await signOut(auth);
}
