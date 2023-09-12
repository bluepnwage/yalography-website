"use client";
import { Button, TextInput } from "@aomdev/ui";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

export function SignInForm() {
  const router = useRouter();

  const onSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    const password = new FormData(e.currentTarget).get("password") as string;
    const { signIn } = await import("@/lib/firebase/auth");
    const { user } = await signIn(email, password);
    const token = await user.getIdToken();
    await fetch("/api/admin", {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST"
    });
    router.push("/");
  };
  return (
    <>
      <h1 className="font-bold text-4xl text-center mb-10 font-heading">Sign in to your account</h1>
      <form onSubmit={onSignIn} className="w-1/4 px-5 space-y-8">
        <TextInput
          label="Email"
          type={"email"}
          placeholder="hello@gmail.com"
          name="email"
          id="email"
          required
        />
        <TextInput
          autoComplete="current-password"
          label="Password"
          type={"password"}
          name="password"
          id="password"
          placeholder="Your password"
          required
        />
        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>
    </>
  );
}
