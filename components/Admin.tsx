"use client";
import { useState, useEffect, useTransition } from "react";
import { onIdTokenChanged, User } from "firebase/auth";
import { auth } from "@lib/firebase/auth";
import { Button } from "./shared/Button";
import { useInterval } from "@mantine/hooks";

export function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [, startTransition] = useTransition();

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
      startTransition(() => {
        setUser(user);
        if (user) {
          user?.getIdToken().then((token) => {
            fetch("/api/admin", {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` }
            });
          });
        } else {
          fetch("/api/admin", {
            method: "DELETE"
          });
        }
      });
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {user && (
        <Button className="hidden md:inline-block" component="a" href={"/admin"} intent="secondary">
          Dashboard
        </Button>
      )}
    </>
  );
}
