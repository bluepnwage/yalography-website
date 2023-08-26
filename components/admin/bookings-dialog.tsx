"use client";
//Components
import { Dialog, Button, TextInput, Select, Textarea, Popover, Calendar, Label } from "@aomdev/ui";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import { cardStyles } from "@aomdev/ui/src/card/styles";

import { IconX } from "@tabler/icons-react";

//Data
import { photoshootTypes } from "@/lib/photoshoot";

//Types
import type { FormEvent } from "react";
import type { ShootTypes } from "@/lib/photoshoot";
import type { DialogProps } from "@aomdev/ui";

//Hooks
import { useState } from "react";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";
import { toast } from "react-toastify";

const selectData = Array.from(photoshootTypes).map(([key, value]) => ({ label: value.label, value: key }));

type Form = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  time: string;
  description: string;
};

export function BookingDialog(props: DialogProps) {
  const [form, setForm] = useState<Partial<Form>>({});
  const [shootType, setShootType] = useState<Lowercase<ShootTypes> | "">("");
  const [date, setDate] = useState<Date>();
  const [selectedFeatures, setFeatures] = useState<string[]>([]);
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();

  const shootDetails = photoshootTypes.get(shootType ? shootType : "regular shoot")!;

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onFeatureChange = (e: FormEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget;
    if (checked) {
      setFeatures(prev => [...prev, value]);
    } else {
      setFeatures(prev => prev.filter(v => v !== value));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle.on();
    try {
      const data = {
        firstName: form.first_name!,
        lastName: form.last_name!,
        email: form.email!,
        phone: form.phone!,
        time: form.time!,
        description: form?.description! || null,
        date: date!,
        type: shootType,
        environment: true,
        features: selectedFeatures.join(",")
      };
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok) {
        setForm({});
        setFeatures([]);
        setDate(undefined);
        refresh();
        setShootType("");
        toast.success(json.message);
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

  const isLoading = isPending || loading;

  return (
    <>
      <Dialog {...props}>
        <Dialog.Content>
          <div className="flex items-center justify-between">
            <Dialog.Title>Create booking</Dialog.Title>
            <Dialog.Close>
              <IconX />
            </Dialog.Close>
          </div>
          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <TextInput
                autoFocus
                label="First Name"
                onChange={handleChange}
                value={form?.first_name}
                name={"first_name"}
                id={"first_name"}
                required
              />
              <TextInput
                label="Last Name"
                onChange={handleChange}
                value={form?.last_name}
                name={"last_name"}
                id={"last_name"}
                required
              />
            </div>
            <div className="flex gap-2">
              <TextInput
                label="Email"
                onChange={handleChange}
                value={form?.email}
                name={"email"}
                id={"email"}
                required
              />
              <TextInput
                label="Phone number"
                onChange={handleChange}
                value={form?.phone}
                name={"phone"}
                id={"phone"}
                required
              />
            </div>
            <div className="flex gap-2 items-end">
              <div className="basis-1/2 grow">
                <TextInput
                  type={"time"}
                  label={"Time"}
                  value={form?.time}
                  onChange={handleChange}
                  name={"time"}
                  id={"time"}
                  required
                />
              </div>
            </div>
            <div className="flex gap-2 items-end">
              <div className="basis-1/2 grow space-y-1">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <Popover.Trigger asChild>
                    <button className={inputStyles({ className: "w-full" })}>{date?.toDateString()}</button>
                  </Popover.Trigger>
                  <Popover.Content className={cardStyles({ className: "z-[9999]" })}>
                    <Calendar
                      disabled={[{ before: new Date() }]}
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
                fullWidth
                items={selectData}
                onValueChange={(value: typeof shootType) => setShootType(value)}
                value={shootType}
              />
            </div>
            <div className="flex gap-2 w-full">
              <Textarea
                style={{ width: "100%" }}
                className="w-full"
                label="Description"
                onChange={handleChange}
                value={form.description}
                name={"description"}
                id={"description"}
                rows={3}
              />
            </div>
            <div className="flex flex-wrap justify-evenly gap-5">
              {shootDetails &&
                shootDetails.features.map(feature => {
                  const value = feature.label.toLowerCase();
                  const checked = selectedFeatures.includes(value);
                  return (
                    <p key={feature.label}>
                      <label htmlFor={feature.label}>{feature.label}</label>
                      <input
                        id={feature.label}
                        type="checkbox"
                        checked={checked}
                        onChange={onFeatureChange}
                        className="accent-red-600 h-5 w-5 "
                        name="features"
                        value={value}
                      />
                    </p>
                  );
                })}
            </div>
            <Button disabled={isLoading} fullWidth>
              Submit
            </Button>
          </form>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
