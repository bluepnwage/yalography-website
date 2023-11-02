"use client";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";
import { formatDate } from "@/util/formate-date";
import { Dialog, Popover, Calendar, DialogProps, Label, Button, TextInput } from "@aomdev/ui";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import { IconCalendar, IconX } from "@tabler/icons-react";
import { FormEvent, useState } from "react";

type PropTypes = {
  id: string;
} & DialogProps;

export function ApproveReschedule({ id, ...props }: PropTypes) {
  const [date, setDate] = useState<Date | undefined>();
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    toggle.on();
    const formData = new FormData(e.currentTarget);
    const time = formData.get("time") || "";
    e.preventDefault();
    console.log(time);
    try {
      const endpoint = new URL("/api/bookings", location.origin);
      endpoint.searchParams.set("reschedule_approve", "1");
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved", id, time, date })
      });
      if (res.ok) {
        refresh();
        setDate(undefined);
        if (props.onOpenChange) {
          props.onOpenChange(false);
        }
      }
    } catch (error) {
    } finally {
      toggle.off();
    }
  };
  return (
    <Dialog {...props}>
      <Dialog.Content className="w-1/4 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <Dialog.Title>Approve Rescheduling</Dialog.Title>
          <Dialog.Close>
            <IconX size={16} />
          </Dialog.Close>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="reschedule_date" className="mb-1 block">
              Select date
            </Label>
            <Popover>
              <Popover.Trigger asChild>
                <button className={inputStyles({ className: "w-full  mb-4 text-start px-2" })}>
                  <IconCalendar size={16} className="inline-block mr-2" />
                  {date ? formatDate(date) : ""}
                </button>
              </Popover.Trigger>
              <Popover.Content className={cardStyles({ className: "z-[9999]" })}>
                <Calendar mode="single" onSelect={setDate} selected={date} />
              </Popover.Content>
            </Popover>
            <input id="reschedule_date" type="date" className="hidden" value={date?.toISOString()} />
          </div>
          <TextInput name="time" type="time" label="Time" required />
          <Button className="block ml-auto" loading={loading || isPending}>
            Approve
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
