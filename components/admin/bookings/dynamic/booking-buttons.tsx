"use client";

import { Button } from "@aomdev/ui";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";
import { useRouter } from "next/navigation";
import { IconDots, IconCircleCheck, IconCalendarEvent, IconTrash } from "@tabler/icons-react";
import { ActionIcon, Dropdown } from "@aomdev/ui";

import { useReducer, FormEvent } from "react";
import { initialState, reducer } from "./dialog-reducer";
import dynamic from "next/dynamic";

import { TextInput } from "@aomdev/ui";

const DeleteDialog = dynamic(() => import("./delete-dialog").then(mod => mod.DeleteDialog));
const RescheduleDialog = dynamic(() => import("./reschedule-dialog").then(mod => mod.RescheduleDialog));
const CreateOrderDialog = dynamic(() => import("./create-order-dialog").then(mod => mod.CreateOrderDialog));
const RescheduleApprove = dynamic(() => import("./approve-reschedule").then(mod => mod.ApproveReschedule));

type PropTypes = {
  id: string;
  status: string;
  date: string;
};

export function BookingButtons({ id, status, date }: PropTypes) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, toggle] = useToggle();
  const [isRefreshing, refresh] = useRouteRefresh();
  const router = useRouter();

  const onApprove = async () => {
    toggle.on();
    const { toast } = await import("react-hot-toast");
    try {
      const res = await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved", id })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        router.push(`/admin/bookings/${id}`);
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
    const { toast } = await import("react-hot-toast");
    const endpoint = new URL("/api/bookings", location.origin);
    endpoint.searchParams.set("send_email", "1");

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
      });
      const json = await res.json();
      if (res.ok) {
        refresh();
        router.push(`/admin/bookings`);
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

  //This function is called to create in order in the database after marking a
  //booking as complete
  const createOrder = async (amount: number, bookingId: string) => {
    const { default: dayjs } = await import("dayjs");
    //Get and format the month and year for db
    const year = dayjs().year();
    const month = dayjs(date).format("MMMM");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, month, bookingId, quote: amount })
    });
    if (res.ok) {
      dispatch({ type: "dialog", payload: "" });
    } else {
      throw new Error("Something happened");
    }
  };

  const onRescheduleApprove = async () => {
    const res = await fetch("/api/bookings");
  };

  return (
    <div className="space-x-4">
      {state.load && (
        <DeleteDialog
          open={state.dialog === "delete"}
          onOpenChange={payload => dispatch({ type: "dialog", payload: !payload ? "" : "delete" })}
        >
          <div className="flex gap-5 justify-end">
            <Button onClick={() => dispatch({ type: "dialog", payload: "" })} variant={"neutral"}>
              Cancel
            </Button>
            <Button variant={"error"} disabled={isLoading || isRefreshing} onClick={onDelete}>
              Delete
            </Button>
          </div>
        </DeleteDialog>
      )}
      {state.load && (
        <RescheduleDialog
          defaultDate={date}
          id={id}
          open={state.dialog === "reschedule"}
          onOpenChange={payload => dispatch({ type: "dialog", payload: !payload ? "" : "reschedule" })}
        />
      )}
      {state.load && (
        <CreateOrderDialog
          open={state.dialog === "order"}
          onOpenChange={payload => dispatch({ type: "dialog", payload: !payload ? "" : "order" })}
        >
          <form onSubmit={onComplete}>
            <TextInput required step={"any"} label="Amount made" id="quote" name="quote" type="number" />
            <Button disabled={isLoading} className="mt-4 block ml-auto">
              Submit
            </Button>
          </form>
        </CreateOrderDialog>
      )}
      {state.load && (
        <RescheduleApprove
          id={id}
          open={state.dialog === "rescheduleApprove"}
          onOpenChange={payload => dispatch({ type: "dialog", payload: !payload ? "" : "rescheduleApprove" })}
        />
      )}

      <Dropdown>
        <Dropdown.Trigger asChild>
          <ActionIcon
            onMouseEnter={!state.load ? () => dispatch({ type: "load" }) : undefined}
            variant={"subtle"}
            color="gray"
          >
            <IconDots size={"75%"} />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Content>
          {status === "pending" && (
            <Dropdown.Item onSelect={onApprove} icon={<IconCircleCheck size={16} />}>
              Approve
            </Dropdown.Item>
          )}
          {status === "approved" && (
            <Dropdown.Item
              onSelect={() => dispatch({ payload: "order", type: "dialog" })}
              icon={<IconCircleCheck size={16} />}
            >
              Mark as complete
            </Dropdown.Item>
          )}

          {status !== "rescheduled" ? (
            <Dropdown.Item
              onSelect={() => dispatch({ type: "dialog", payload: "reschedule" })}
              icon={<IconCalendarEvent size={16} />}
            >
              Reschedule
            </Dropdown.Item>
          ) : (
            <Dropdown.Item
              onSelect={() => dispatch({ type: "dialog", payload: "rescheduleApprove" })}
              icon={<IconCalendarEvent size={16} />}
            >
              Approve
            </Dropdown.Item>
          )}
          <Dropdown.Item
            color="error"
            onSelect={() => dispatch({ type: "dialog", payload: "delete" })}
            icon={<IconTrash size={16} />}
          >
            Cancel
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
