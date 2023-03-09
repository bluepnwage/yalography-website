"use client";
import { Input } from "@components/shared/Input";
import { Button } from "@components/shared/Button";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

export function SignInForm() {
  const router = useRouter();

  const onSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    const password = new FormData(e.currentTarget).get("password") as string;
    const { signIn } = await import("@lib/firebase/auth");
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
      <form
        onSubmit={onSignIn}
        className="bg-white basis-2/6 px-5 border-r dark:border-zinc-700 border-zinc-200 rounded-md p-4 space-y-4 dark:bg-zinc-900"
      >
        <h1 className="font-bold text-3xl text-center mb-5">Welcome back!</h1>
        <Input label="Email" type={"email"} placeholder="hello@gmail.com" name="email" id="email" required />
        <Input
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
