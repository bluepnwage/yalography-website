"use client";
import { Button } from "@components/shared/Button";
const revalidateSecret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;

export function Revalidate() {
  const onRevalidate = async () => {
    const { toast } = await import("react-toastify");
    const url = new URL(`/api/revalidate-gallery`, location.origin);
    url.searchParams.set("secret", revalidateSecret || "");
    const id = toast.loading("Revalidating gallery", { autoClose: false });
    const res = await fetch(url);
    if (res.ok) {
      toast.dismiss(id);
      toast.success("Gallery updated");
    } else {
      toast.dismiss(id);
      toast.error("Failed to revalidate gallery");
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
