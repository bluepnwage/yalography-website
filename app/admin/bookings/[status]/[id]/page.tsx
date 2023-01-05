"use client";
import { Anchor, Breadcrumbs } from "@components/shared";
import { Button } from "@components/shared/Button";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";
import { DialogDemo } from "@components/shared/Dialog";
import { Input } from "@components/shared/Input";

//Hooks
import { useRouter } from "next/navigation";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { useBookings } from "@components/admin/bookings/BookingsProvider";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import type { FormEvent } from "react";

type FormSubmission = FormEvent<HTMLFormElement>;
type CallbackFunc = (amount: number, id: number) => Promise<void>;

export default function Booking({ params }: { params: { status: "pending" | "approved"; id: string } }) {
  const router = useRouter();
  const booking = useBookings(params.status).find((b) => b.id === parseInt(params.id))!;
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();

  const onApprove = async () => {
    toggle.on();
    try {
      const res = await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved", id: parseInt(params.id) })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        router.push(`/admin/bookings/approved/${params.id}`);
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
    try {
      const res = await fetch("/api/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: parseInt(params.id) })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        router.push(`/admin/bookings/${params.status}`);
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

  const onComplete = async (e: FormSubmission, cb: (amount: number, id: number) => Promise<void>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget).get("quote");
    toggle.on();
    try {
      const res = await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: parseInt(params.id), status: "completed" })
      });
      const json = await res.json();
      if (res.ok) {
        await cb(parseFloat(formData as string) * 100, parseInt(params.id));
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

  const isLoading = loading || isPending;

  return (
    <>
      <Breadcrumbs>
        <Anchor href={"/admin/bookings"}>Bookings</Anchor>
        <Anchor href={`/admin/bookings/${params.status}`} className="capitalize">
          {params.status}
        </Anchor>
        <Anchor href={`/admin/bookings/${params.status}/${params.id}`}>{booking.id}</Anchor>
      </Breadcrumbs>
      <section className="flex gap-4 mt-5">
        <div className="w-2/4 basis-3/5 ring-1 bg-white p-4 ring-zinc-200 dark:ring-zinc-700 dark:bg-zinc-800 rounded-md">
          <div className="border-b flex justify-between border-zinc-200 dark:border-zinc-700 -mx-4 -mt-4 px-4 py-1 mb-4">
            <h1 className="font-bold text-4xl">Order details</h1>
            <Menu onComplete={onComplete} onApprove={onApprove} onDelete={onDelete} status={params.status} />
          </div>
          <p className="text-gray-400 mb-4">Booking #{booking.id}</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Environment:</p>
              <p>{booking.environment ? "Inside" : "Outside"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Photoshoot type:</p>
              <p className="capitalize">{booking.type}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Date:</p>
              <p className="capitalize">
                {booking.date}, {booking.time}
              </p>
            </div>
            <div className="">
              <p className="font-semibold text-gray-400">Add-ons:</p>
              <ul className="capitalize list-disc pl-4">
                {booking?.features?.split(",").map((feature) => {
                  return <li key={feature}>{feature}</li>;
                })}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-400">Description:</p>
              <p className="capitalize">{booking.description}</p>
            </div>
          </div>
        </div>
        <div className="basis-2/5 p-4 flex flex-col bg-white dark:bg-zinc-800 rounded-md ring-1 ring-zinc-200 dark:ring-zinc-700">
          <div className="py-2 mb-4 -mx-4 px-4 -mt-4 border-b dark:border-zinc-700 border-zinc-200">
            <h2 className="font-bold text-2xl">Customer details</h2>
          </div>
          <div className="flex flex-col grow justify-evenly">
            <div className="flex justify-between  ">
              <p className="font-semibold text-gray-400">Name:</p>
              <p>
                {booking.firstName} {booking.lastName}
              </p>
            </div>
            <div className="flex justify-between  ">
              <p className="font-semibold text-gray-400">Email:</p>
              <p>{booking.email}</p>
            </div>
            <div className="flex justify-between ">
              <p className="font-semibold text-gray-400">Phone:</p>
              <p>{booking.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type MenuProps = {
  status: "pending" | "approved";
  onDelete: () => Promise<void>;
  onApprove: () => Promise<void>;
  onComplete: (e: FormSubmission, cb: CallbackFunc) => Promise<void>;
};

function Menu({ status, onApprove, onComplete, onDelete }: MenuProps) {
  const [dialog, dialogToggle] = useToggle();

  const formSubmission = async (amount: number, bookingId: number) => {
    const year = dayjs().year();
    const month = dayjs().format("MMMM");
    console.log(typeof amount);
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

  return (
    <>
      <DialogDemo title="Revenue" open={dialog} onOpenChange={dialogToggle.set}>
        <form onSubmit={(e) => onComplete(e, formSubmission)}>
          <Input required step={"any"} label="Amount made" id="quote" name="quote" type="number" />
          <Button className="mt-4" intent={"accept"}>
            Submit
          </Button>
        </form>
      </DialogDemo>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <button aria-label="Manage booking">
            <DotsVertical />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          {status === "approved" && <Dropdown.Item onClick={dialogToggle.on}>Mark as complete</Dropdown.Item>}
          {status === "pending" && <Dropdown.Item onClick={onApprove}>Approve booking</Dropdown.Item>}
          <Dropdown.Item onClick={onDelete}>Cancel & Delete booking</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  );
}
