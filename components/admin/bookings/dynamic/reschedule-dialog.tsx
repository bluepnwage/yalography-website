"use client";
import { Button, Calendar, Dialog, DialogProps, Label, Popover } from "@aomdev/ui";
import { cardStyles } from "@aomdev/ui/src/card/styles";

export function RescheduleDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <Dialog.Content className="w-1/4">
        <Dialog.Title>Reschedule booking</Dialog.Title>
        <Label htmlFor="reschedule_date"></Label>
        <Popover>
          <Popover.Trigger asChild>
            <button className={cardStyles({ className: "w-full mt-6 mb-4" })}></button>
          </Popover.Trigger>
          <Popover.Content className={cardStyles({ className: "z-[9999]" })}>
            <Calendar selected={[new Date()]} month={new Date()} />
            <input id="reschedule_date" name="reschedule_date" type="date" />
          </Popover.Content>
        </Popover>
        <Button className="block ml-auto">Reschedule</Button>
      </Dialog.Content>
    </Dialog>
  );
}
