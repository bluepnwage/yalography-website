"use client";
import { signIn, logOut } from "@lib/firebase/auth";
import { Input } from "@components/shared/Input";
import { Button } from "@components/shared/Button";
import { FormEvent } from "react";

export function SignInForm() {
  const onSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    const password = new FormData(e.currentTarget).get("password") as string;
    await signIn(email, password);
  };
  return (
    <>
      <form onSubmit={onSignIn}>
        <Input label="Email" type={"email"} name="email" id="email" required />
        <Input
          autoComplete="current-password"
          label="Password"
          type={"password"}
          name="password"
          id="password"
          required
        />
        <Button type="submit">Sign in</Button>
      </form>
      <Button onClick={logOut}>Log out</Button>
    </>
  );
}
