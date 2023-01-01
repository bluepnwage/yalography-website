"use client";
import { Anchor, Title, Card, Grid, Breadcrumbs } from "@components/shared";
import { Button } from "@components/shared/Button";
import { photoshootTypes } from "@lib/photoshoot";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical } from "@lib/icons";
import { DialogDemo } from "@components/shared/Dialog";
import dayjs from "dayjs";

//Hooks
import { useRouter } from "next/navigation";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";
import { useBookings } from "@components/admin/bookings/BookingsProvider";
import { Input } from "@components/shared/Input";

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
    const res = await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved", id: parseInt(params.id) })
    });
    if (res.ok) {
      refresh();
      toggle.off();
      router.push(`/admin/bookings/approved/${params.id}`);
    }
  };

  const onDelete = async () => {
    toggle.on();
    const res = await fetch("/api/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: parseInt(params.id) })
    });
    if (res.ok) {
      refresh();
      toggle.off();
      router.push(`/admin/bookings/${params.status}`);
    }
  };

  const onComplete = async (e: FormSubmission, cb: (amount: number, id: number) => Promise<void>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget).get("quote");

    toggle.on();
    const res = await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: parseInt(params.id), status: "completed" })
    });
    if (res.ok) {
      await cb(parseFloat(formData as string) * 100, parseInt(params.id));
      refresh();
      toggle.off();
      router.push("/admin/bookings");
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
      <div className="flex ml-auto mb-16 mt-10 justify-between">
        <Title order={"h1"} className="text-3xl">
          {booking.date}
        </Title>
        <div className="flex gap-2 ">
          {isLoading && <span className="absolute -top-10">Loading...</span>}
          <Menu onComplete={onComplete} onApprove={onApprove} onDelete={onDelete} status={params.status} />
        </div>
      </div>
      <Card glow className="rounded-md mb-5">
        <Grid fullWidth>
          <div className="col-span-6 space-y-2">
            <Title order={"h2"}>Contact information</Title>

            <p>
              <span className="font-semibold">Name:</span> {booking.firstName} {booking.lastName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {booking.email}
            </p>
            <p>
              <span className="font-semibold">Phone number:</span> {booking.phone}
            </p>
          </div>
          <div className="col-span-6 space-y-2">
            <Title order={"h2"}>Reservations details</Title>
            <p>
              <span className="font-semibold">Photoshoot type:</span> {photoshootTypes.get(booking.type as any)?.label}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {booking.date}. {booking.time}
            </p>
            <strong className="inline-block">Selected features:</strong>
            <ul className="list-disc pl-4">
              {booking.features?.split(",").map((feature) => {
                return <li key={feature}>{feature}</li>;
              })}
            </ul>
          </div>
          <div className="col-span-6">
            <Title className="mb-5" order={"h2"}>
              Additional comments
            </Title>
            <p className="text-lg">{booking.description}</p>
          </div>
        </Grid>
      </Card>
      <div className="flex justify-between">
        <Button intent={"secondary"}>Previous</Button>
        <Button>Next</Button>
      </div>
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
