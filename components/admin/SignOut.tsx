"use client";
import { Button } from "@components/shared/Button";
import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();

  const onSignOut = async () => {
    const { logOut } = await import("@lib/firebase/auth");
    await logOut();
    router.push("/");
  };

  return (
    <div className="w-full flex justify-center">
      <Button intent={"secondary"} onClick={onSignOut}>
        Sign out
      </Button>
    </div>
  );
}
