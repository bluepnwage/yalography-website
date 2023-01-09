"use client";
import { Button } from "@components/shared/Button";
const revalidateSecret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;
import { toast } from "react-toastify";

export function Revalidate() {
  const onRevalidate = async () => {
    const url = new URL(`/api/revalidate-gallery`);
    url.searchParams.set("secret", revalidateSecret || "");
    const res = await fetch(url);
    if (res.ok) {
      toast.success("Gallery updated");
    }
  };
  return (
    <>
      <Button intent={"secondary"} onClick={onRevalidate}>
        Revalidate gallery
      </Button>
    </>
  );
}
