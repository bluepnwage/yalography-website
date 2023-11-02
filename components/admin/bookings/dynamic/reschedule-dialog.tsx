"use client";
import { formatDate } from "@/util/formate-date";
import { Button, Calendar, Dialog, DialogProps, Label, Popover } from "@aomdev/ui";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { IconX, IconCalendar } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { toast } from "react-hot-toast";
import { useToggle } from "@/lib/hooks/useToggle";

type PropTypes = {
  id: string;
  defaultDate: string;
} & DialogProps;

export function RescheduleDialog({ id, defaultDate, ...props }: PropTypes) {
  const [date, setDate] = useState<Date[] | undefined>();
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    toggle.on();
    e.preventDefault();
    if (!date || date.length === 0) return;
    try {
      const endpoint = new URL("/api/bookings", location.origin);
      endpoint.searchParams.set("reschedule", "1");
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "rescheduled", dates: date.map(d => formatDate(d)) })
      });
      if (res.ok) {
        refresh();
        setDate(undefined);
        if (props.onOpenChange) props.onOpenChange(false);
        toast.success("Booking successfully rescheduled. The customer has been notified.", {
          duration: 5000
        });
      } else {
        const json = await res.json();
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

  const disabledDays = [{ before: new Date() }];
  return (
    <Dialog {...props}>
      <Dialog.Content className="w-1/4 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <Dialog.Title>Reschedule booking</Dialog.Title>
          <Dialog.Close>
            <IconX size={16} />
          </Dialog.Close>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="reschedule_date" className="">
              Possible dates
            </Label>
            <span className="text-sm mb-1 block text-gray-600 dark:text-gray-300">
              Selected up to 5 possible dates
            </span>
            <Popover>
              <Popover.Trigger asChild>
                <button className={inputStyles({ className: "w-full  mb-4 text-start px-2" })}>
                  <IconCalendar size={16} className="inline-block mr-2" />
                  {date ? `${date.length} days seleted` : null}
                </button>
              </Popover.Trigger>
              <Popover.Content className={cardStyles({ className: "z-[9999]" })}>
                <Label htmlFor="">Date</Label>
                <Calendar
                  max={5}
                  selected={date}
                  onSelect={setDate}
                  mode="multiple"
                  disabled={disabledDays}
                />
              </Popover.Content>
            </Popover>
          </div>
          <div>
            <p className="mb-2">Selected dates:</p>
            <ul className="space-y-4 list-disc pl-4">
              {date?.map(date => {
                return <li key={date.toString()}>{formatDate(date)}</li>;
              })}
            </ul>
          </div>

          <Button
            disabled={loading || isPending || !date || date.length === 0}
            className="block ml-auto group"
          >
            <span className="group-data-[loading=true]:hidden">Reschedule</span>
          </Button>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
