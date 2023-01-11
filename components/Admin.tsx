"use client";
import { useState, useEffect } from "react";
import { onIdTokenChanged, User } from "firebase/auth";
import { auth } from "@lib/firebase/auth";
import { Button } from "./shared/Button";
import { useInterval } from "@mantine/hooks";

export function Admin() {
  const [user, setUser] = useState<User | null>(null);

  const interval = useInterval(async () => {
    if (user) {
      await user.getIdToken(true);
    }
  }, 10 * 60 * 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const token = await user?.getIdToken();
        await fetch("/api/admin", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await fetch("/api/admin", {
          method: "DELETE"
        });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {user && (
        <Button component="a" href={"/admin"} intent="secondary">
          Dashboard
        </Button>
      )}
    </>
  );
}
