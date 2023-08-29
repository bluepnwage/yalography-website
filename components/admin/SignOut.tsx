"use client";
import { Button } from "@aomdev/ui";
import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();

  const onSignOut = async () => {
    const { logOut } = await import("@/lib/firebase/auth");
    await logOut();
    router.push("/");
  };

  return (
    <div className="w-full flex justify-center">
      <Button variant={"neutral"} onClick={onSignOut}>
        Sign out
      </Button>
    </div>
  );
}
