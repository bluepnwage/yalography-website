"use client";
import { Button, Calendar, Dialog, DialogProps, Popover } from "@aomdev/ui";
import { cardStyles } from "@aomdev/ui/src/card/styles";
// import { IconDatabaseOff } from "@tabler/icons-react";
export function RescheduleDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <Dialog.Content>
        <Dialog.Title>Reschedule booking</Dialog.Title>
        <Popover>
          <Popover.Trigger>
            <Button variant={"outline"}></Button>
          </Popover.Trigger>
          <Popover.Content className={cardStyles({ className: "z-[9999]" })}>
            <Calendar selected={[new Date()]} month={new Date()} />
          </Popover.Content>
        </Popover>
      </Dialog.Content>
    </Dialog>
  );
}
