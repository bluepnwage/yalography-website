"use client";

import { Button } from "@components/shared/Button";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { useRouter } from "next/navigation";

type PropTypes = {
  id: number;
  status: string;
};

export function BookingButtons({ id, status }: PropTypes) {
  const [isLoading, toggle] = useToggle();
  const [isRefreshing, refresh] = useRouteRefresh();
  const router = useRouter();

  const onApprove = async () => {
    toggle.on();
    const { toast } = await import("react-toastify");
    try {
      const res = await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved", id })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        router.push(`/admin/bookings/approved/${id}`);
        toast.success("Booking approved.");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  const onDelete = async () => {
    toggle.on();
    const { toast } = await import("react-toastify");

    try {
      const res = await fetch("/api/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        router.push(`/admin/bookings/${status}`);
        toast.success(json.message);
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  return (
    <div className="space-x-4">
      <Button onClick={onApprove}>Approve</Button>
      <Button intent={"secondary"} onClick={onDelete}>
        Cancel
      </Button>
    </div>
  );
}
