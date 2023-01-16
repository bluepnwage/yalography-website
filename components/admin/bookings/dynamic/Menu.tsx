"use client";
import { Button } from "@components/shared/Button";
import { Dropdown } from "@components/shared/Dropdown";
import { Input } from "@components/shared/Input";
import { DotsVertical, CircleCheck, Trash, CalendarTime } from "@lib/icons";
import dynamic from "next/dynamic";

const Dialog = dynamic(() => import("@components/shared/Dialog").then((mod) => mod.Dialog));
const DatePicker = dynamic(() => import("@components/shared/DatePicker/DatePicker").then((mod) => mod.DatePicker));

import { useRouter } from "next/navigation";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";

import { FormEvent, useState } from "react";

type MenuProps = {
  status: "pending" | "approved";
  id: number;
};

export function BookingMenu({ status, id }: MenuProps) {
  const [dialog, dialogToggle] = useToggle();
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();
  const router = useRouter();
  const [lazyLoad, lazyLoadToggle] = useToggle();
  const [rescheduleDialog, rescheduleToggle] = useToggle();
  const [newDate, setNewDate] = useState<Date | null>(null);

  //This function is called to create in order in the database after marking a
  //booking as complete
  const createOrder = async (amount: number, bookingId: number) => {
    const { default: dayjs } = await import("dayjs");
    //Get and format the month and year for db
    const year = dayjs().year();
    const month = dayjs().format("MMMM");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, month, bookingId, quote: amount })
    });
    if (res.ok) {
      console.log("Nice");
      dialogToggle.off();
    } else {
      throw new Error("Something happened");
    }
  };

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

  const onReschedule = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const time = new FormData(e.currentTarget).get("time");
    toggle.on();

    const { toast } = await import("react-toastify");
    try {
      const res = await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDate, time, id })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        toast.success("Booking succesfully updated. Don't forget to send your customer an email!");
        setNewDate(null);
        rescheduleToggle.off();
      } else {
        throw new Error(json.message, { cause: json.error });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  const onComplete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget).get("quote");
    toggle.on();
    const { toast } = await import("react-toastify");

    try {
      const res = await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, status: "completed" })
      });
      const json = await res.json();
      if (res.ok) {
        await createOrder(parseFloat(formData as string) * 100, id);
        refresh();
        router.push("/admin/bookings");
        toast.success("Bookings marked as completed.");
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

  const isLoading = isPending || loading;

  return (
    <>
      {lazyLoad && (
        <Dialog title="Revenue" open={dialog} onOpenChange={dialogToggle.set}>
          <form onSubmit={onComplete}>
            <Input required step={"any"} label="Amount made" id="quote" name="quote" type="number" />
            <Button disabled={isLoading} className="mt-4" intent={"accept"}>
              Submit
            </Button>
          </form>
        </Dialog>
      )}
      {lazyLoad && (
        <Dialog open={rescheduleDialog} onOpenChange={rescheduleToggle.set} title="Reschedule booking">
          <form className="space-y-4" onSubmit={onReschedule}>
            <DatePicker value={newDate} onChange={setNewDate} required name="reschedule" minDate={new Date()} />
            <Input required type={"time"} label="Time" id="time" name="time" />
            <Button disabled={!newDate || isLoading}>Submit</Button>
          </form>
        </Dialog>
      )}
      <Dropdown>
        <Dropdown.Trigger>
          <button aria-label="Manage booking">
            <DotsVertical />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          {status === "approved" && (
            <Dropdown.Item onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined} onClick={dialogToggle.on}>
              {" "}
              <CircleCheck size={16} className="stroke-yellow-500 inline-block mr-2" />
              Mark as complete
            </Dropdown.Item>
          )}
          {status === "pending" && (
            <>
              <Dropdown.Item onClick={onApprove}>
                {" "}
                <CircleCheck size={16} className="stroke-yellow-500 inline-block mr-2" />
                Approve booking
              </Dropdown.Item>
              <Dropdown.Item onClick={rescheduleToggle.on} onMouseEnter={!lazyLoad ? lazyLoadToggle.on : undefined}>
                {" "}
                <CalendarTime size={16} className="stroke-yellow-500 inline-block mr-2" />
                Reschedule booking
              </Dropdown.Item>
            </>
          )}
          <Dropdown.Item onClick={onDelete}>
            {" "}
            <Trash size={16} className="inline-block mr-2 stroke-yellow-500 " />
            Cancel & Delete booking
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}
