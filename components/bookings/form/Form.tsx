"use client";
import { MantineProvider, Stepper } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { FormEvent, useState } from "react";
import { Button } from "@components/shared";
import { Input } from "@components/shared/Input";
import { Select } from "@components/shared/Select";
import { Textarea } from "@components/shared/Textarea";
import { photoshootTypes } from "@lib/photoshoot";

import type { ShootTypes } from "@lib/photoshoot";

const selectData = Array.from(photoshootTypes).map(([key, value]) => ({ label: value.label, value: key }));

export function BookingsFormContainer() {
  return (
    <MantineProvider theme={{ colorScheme: "dark", primaryColor: "red" }}>
      <BookingsForm />
    </MantineProvider>
  );
}

type Form = {
  name: string;
  email: string;
  phone: string;
  time: string;
  description: string;
};

function BookingsForm() {
  const [active, setActive] = useState(0);
  const [form, setForm] = useState<Partial<Form>>({});
  const [shootType, setShootType] = useState<Lowercase<ShootTypes> | "">("");
  const [date, setDate] = useState<Date | null>(null);
  const [selectedFeatures, setFeatures] = useState<string[]>([]);

  const shootDetails = shootType ? photoshootTypes.get(shootType)! : "";

  const prevStep = () => {
    if (active === 0) return;
    setActive((prev) => prev - 1);
  };

  const nextStep = () => {
    if (active === 3) return;
    setActive((prev) => prev + 1);
  };

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

  return (
    <>
      <form>
        <Stepper
          breakpoint={"sm"}
          classNames={{
            stepLabel: "text-gray-900 dark:text-gray-100",
            stepDescription: "text-gray-600 dark:text-gray-300",
            stepIcon: `bg-gray-200 border-gray-400 border-2 text-gray-900 duration-200 ease-out
            dark:border-zinc-600 dark:bg-zinc-700 dark:text-gray-100 
            data-[progress=true]:border-red-600 data-[progress=true]:dark:border-red-600 data-[completed=true]:bg-red-600 
            data-[completed=true]:dark:bg-red-600 data-[completed=true]:dark:border-red-600`
          }}
          active={active}
          onStepClick={setActive}
        >
          <Stepper.Step label="Contact information" description="Enter contact info">
            <section className="space-y-4">
              <Input value={form?.name} onChange={handleChange} label="Name" name="name" className="w-full" />
              <Input
                value={form?.email}
                onChange={handleChange}
                label="Email"
                type={"email"}
                name="email"
                className="w-full"
              />
              <Input
                value={form?.phone}
                onChange={handleChange}
                label="Phone"
                type={"tel"}
                name="phone"
                className="w-full"
              />
            </section>
          </Stepper.Step>
          <Stepper.Step label="Booking details" description="Enter booking details">
            <section className="space-y-4">
              <Select
                value={shootType}
                onValueChange={(value: Lowercase<ShootTypes>) => setShootType(value)}
                placeholder="Photoshoot type"
                data={selectData}
              />
              {shootDetails && (
                <fieldset>
                  <legend className="font-semibold text-xl">Features:</legend>
                  {shootDetails.features.map((feature, key) => {
                    return (
                      <p key={key} className="inline-block mr-5 last-of-type:mr-0">
                        <label className="select-none" htmlFor={feature.label.toLowerCase()}>
                          {feature.label}
                        </label>
                        <input
                          checked={selectedFeatures.includes(feature.label.toLowerCase())}
                          onChange={onFeatureChange}
                          className="w-7 h-7 accent-red-500"
                          key={key}
                          id={feature.label.toLowerCase()}
                          name={"feature"}
                          type={"checkbox"}
                          value={feature.label.toLowerCase()}
                        />
                      </p>
                    );
                  })}
                </fieldset>
              )}
              <DatePicker
                value={date}
                onChange={setDate}
                label="Date"
                classNames={{
                  input: "border-gray-400 dark:border-gray-700 bg-zinc-100 dark:bg-zinc-700 rounded-md",
                  label: "text-gray-900 dark:text-gray-300 text-md",
                  dropdown: "bg-white border-gray-400 dark:border-gray-700 dark:bg-zinc-800",
                  day: "text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-zinc-600 data-[outside=true]:text-gray-300 data-[outside=true]:dark:text-gray-500 data-[weekend=true]:dark:text-red-500 data-[weekend=true]:text-red-600",
                  weekday: "text-gray-500 dark:text-gray-400",
                  month: "text-red-500 dark:text-gray-400"
                }}
              />
              <Input
                value={form?.time}
                onChange={handleChange}
                name={"time"}
                label="Time"
                type={"time"}
                className="accent-red-600 w-full"
              />
              <Textarea
                value={form?.description}
                onChange={handleChange}
                rows={3}
                name={"description"}
                label="Description"
                className="w-full"
              />
            </section>
          </Stepper.Step>
          <Stepper.Step label="Confirmation" description="Confirm information">
            <section className="grid grid-cols-6 lg:grid-cols-2 gap-2 text-lg">
              <div className="col-span-full lg:col-span-1">
                <p className="font-bold text-2xl mb-4">Contact information</p>
                <p>
                  <span className="font-semibold">Name:</span> {form?.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {form?.email}
                </p>
                <p>
                  <span className="font-semibold">Phone number:</span> {form?.phone}
                </p>
              </div>
              <div className="col-span-full lg:col-span-1">
                <p className="font-bold text-2xl mb-4">Reservation details</p>
                <p>
                  <span className="font-semibold">Photoshoot type:</span> {shootType}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {date?.toDateString()}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {form?.time}
                </p>
                <p>
                  <span className="font-semibold">Comments:</span> {form?.description}
                </p>
              </div>
              {shootDetails && (
                <div className="col-span-full">
                  <p className="font-semibold text-2xl">Photoshoot details</p>
                  <p>{shootDetails.label}</p>
                  <p>Time: {formatTime(shootDetails.time)}</p>
                  <p>Features:</p>
                  <ul className="list-disc pl-4">
                    {selectedFeatures.map((value, key) => {
                      return (
                        <li key={key}>
                          <p>{value}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </section>
          </Stepper.Step>
          <Stepper.Completed>
            <p className="text-lg">
              Your request has been confirmed. <br /> We will get back to you as soon as possible to confirm your
              request
            </p>
          </Stepper.Completed>
        </Stepper>
      </form>
      <div className="flex justify-between mt-5">
        <Button onClick={prevStep} disabled={active === 0} intent={"secondary"} className="border border-red-600">
          Previous
        </Button>
        <Button onClick={nextStep} disabled={active === 3}>
          Next
        </Button>
      </div>
    </>
  );
}

function formatTime(time: number | string) {
  if (typeof time === "string") return time;
  return `${time / 60 / 60}h`;
}
