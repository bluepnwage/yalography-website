"use client";
//Components
import { DialogDemo } from "@components/shared/Dialog";
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";
import { Select } from "@components/shared/Select";
import { DatePicker } from "@components/bookings/DatePicker/DatePicker";
import { Textarea } from "@components/shared/Textarea";

//Data
import { photoshootTypes } from "@lib/photoshoot";

//Types
import type { FormEvent } from "react";
import type { ShootTypes } from "@lib/photoshoot";

//Hooks
import { useState } from "react";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useToggle } from "@lib/hooks/useToggle";

const selectData = Array.from(photoshootTypes).map(([key, value]) => ({ label: value.label, value: key }));

type Form = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  time: string;
  description: string;
};

export function BookingDialog() {
  const [form, setForm] = useState<Partial<Form>>({});
  const [shootType, setShootType] = useState<Lowercase<ShootTypes> | "">("");
  const [date, setDate] = useState<Date | null>(null);
  const [selectedFeatures, setFeatures] = useState<string[]>([]);
  const [isPending, refresh] = useRouteRefresh();
  const [loading, toggle] = useToggle();

  const shootDetails = photoshootTypes.get(shootType ? shootType : "regular shoot")!;

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFeatureChange = (e: FormEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget;
    if (checked) {
      setFeatures((prev) => [...prev, value]);
    } else {
      setFeatures((prev) => prev.filter((v) => v !== value));
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
      if (res.ok) {
        console.log("Success!!");
        setForm({});
        setFeatures([]);
        setDate(null);
        refresh();
        setShootType('')
      } else {
        const json = await res.json();
        throw new Error(json.message);
      }
    } catch (error) {
        console.error('There was error!!!!')
    } finally {
      toggle.off();
    }
  };

  const isLoading = isPending || loading;

  return (
    <DialogDemo title={"Create booking"} trigger={<Button>Create booking</Button>}>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Input
            label="First Name"
            onChange={handleChange}
            value={form?.first_name}
            name={"first_name"}
            id={"first_name"}
            required
          />
          <Input
            label="Last Name"
            onChange={handleChange}
            value={form?.last_name}
            name={"last_name"}
            id={"last_name"}
            required
          />
        </div>
        <div className="flex gap-2">
          <Input label="Email" onChange={handleChange} value={form?.email} name={"email"} id={"email"} required />
          <Input
            label="Phone number"
            onChange={handleChange}
            value={form?.phone}
            name={"phone"}
            id={"phone"}
            required
          />
        </div>
        <div className="flex gap-2 items-end">
          <Input
            type={"time"}
            label={"Time"}
            value={form?.time}
            onChange={handleChange}
            name={"time"}
            id={"time"}
            required
          />
          <DatePicker date={date} onChange={setDate} />
        </div>
        <div className="flex gap-2">
          <Select
            data={selectData}
            onValueChange={(value: typeof shootType) => setShootType(value)}
            value={shootType}
          />
        </div>
        <div className="flex gap-2">
          <Textarea
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
            shootDetails.features.map((feature) => {
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
        <Button disabled={isLoading} fullWidth intent={"accept"}>
          Submit
        </Button>
      </form>
    </DialogDemo>
  );
}
