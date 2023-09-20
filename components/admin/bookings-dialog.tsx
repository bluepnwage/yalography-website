"use client";
//Components
import {
  Dialog,
  TextInput,
  Select,
  Textarea,
  Popover,
  Calendar,
  Label,
  Checkbox,
  Radio,
  ScrollArea
} from "@aomdev/ui";
import { SubmitButton } from "../submit-button";

import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import { cardStyles } from "@aomdev/ui/src/card/styles";

import { IconX } from "@tabler/icons-react";

//Data
import { photoshootTypes } from "@/lib/photoshoot";

//Types
import type { ShootTypes } from "@/lib/photoshoot";
import type { DialogProps } from "@aomdev/ui";

//Hooks
import { useState } from "react";

import { formatDate } from "@/util/formate-date";
import { createBooking } from "./action";
import { useCommand } from "./command-provider";

const selectData = Array.from(photoshootTypes).map(([key, value]) => ({ label: value.label, value: key }));

export function BookingDialog(props: DialogProps) {
  const [shootType, setShootType] = useState<Lowercase<ShootTypes> | "">("");
  const [date, setDate] = useState<Date>();
  const [selectedFeatures, setFeatures] = useState<string[]>([]);
  const { dispatch } = useCommand();

  const shootDetails = photoshootTypes.get(shootType ? shootType : "regular shoot")!;

  const onFeatureChange = (value: string, checked: boolean) => {
    if (checked) {
      setFeatures(prev => [...prev, value]);
    } else {
      setFeatures(prev => prev.filter(v => v !== value));
    }
  };

  const onSubmit = async (form: FormData) => {
    const { toast } = await import("react-hot-toast");
    if (!date) return toast.error("Must provide a date");
    await createBooking(form, date, selectedFeatures.join(","));
    toast.success("Booking created");
    dispatch({ type: "dialog", payload: "" });
    setFeatures([]);
    setShootType("");
    setDate(undefined);
  };
  return (
    <>
      <Dialog {...props}>
        <Dialog.Content blur={true}>
          <div className="flex items-center justify-between">
            <Dialog.Title>Create booking</Dialog.Title>
            <Dialog.Close>
              <IconX />
            </Dialog.Close>
          </div>
          <>
            <form className="space-y-4 mt-6 p-4 overflow-y-scroll [height:60vh]" action={onSubmit}>
              <div className="flex gap-2">
                <TextInput autoFocus label="First Name" name={"first_name"} id={"first_name"} required />
                <TextInput label="Last Name" name={"last_name"} id={"last_name"} required />
              </div>
              <div className="flex gap-2">
                <TextInput label="Email" name={"email"} id={"email"} required />
                <TextInput label="Phone number" name={"phone"} id={"phone"} required />
              </div>
              <div className="flex gap-2 items-end">
                <div className="basis-1/2 grow">
                  <TextInput type={"time"} label={"Time"} name={"time"} id={"time"} required />
                </div>
              </div>
              <div className="flex gap-2 items-end">
                <div className="basis-1/2 grow space-y-1">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <Popover.Trigger asChild>
                      <button className={inputStyles({ className: "w-full text-start px-2" })}>
                        {date ? formatDate(date) : "Date"}
                      </button>
                    </Popover.Trigger>
                    <Popover.Content className={cardStyles({ className: "z-[9999]" })}>
                      <Calendar
                        labelContentProps={{ className: "z-[9999]" }}
                        // disabled={[{ before: new Date() }]}
                        selected={date}
                        onSelect={setDate}
                        mode="single"
                      />
                    </Popover.Content>
                  </Popover>
                  <input type="date" hidden id="date" value={date?.toISOString()} />
                </div>
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="">Shoot type</Label>
                <Select
                  name="shoot_type"
                  contentProps={{ className: "z-[9999]" }}
                  fullWidth
                  items={selectData}
                  onValueChange={(value: Lowercase<ShootTypes>) => setShootType(value)}
                />
              </div>
              <fieldset className="space-y-1 w-full">
                <legend>Environment</legend>
                <Radio name="environment" required>
                  <Radio.Item value="inside" label="Inside" />
                  <Radio.Item value="outside" label="Outside" />
                </Radio>
              </fieldset>
              <div className=" w-full">
                <Textarea
                  style={{ width: "100%" }}
                  className="w-full"
                  label="Description"
                  name={"description"}
                  id={"description"}
                  rows={3}
                />
              </div>
              <fieldset className="flex flex-col  gap-3">
                <legend className="mb-1">Features</legend>
                {shootDetails &&
                  shootDetails.features.map(feature => {
                    const value = feature.label.toLowerCase();
                    const checked = selectedFeatures.includes(value);
                    return (
                      <>
                        <Checkbox
                          label={feature.label}
                          key={`${shootType}-${feature.label}`}
                          name="features"
                          value={value}
                          checked={checked}
                          onCheckedChange={val => {
                            onFeatureChange(value, val.valueOf() as boolean);
                          }}
                        />
                      </>
                    );
                  })}
              </fieldset>
              <SubmitButton className=" mt-6 ml-auto">Submit</SubmitButton>
            </form>
          </>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
