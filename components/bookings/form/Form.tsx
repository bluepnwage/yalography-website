"use client";
import { MantineProvider, Stepper } from "@mantine/core";
import { DatePicker } from "../DatePicker/DatePicker";
import { FormEvent, useState, useRef } from "react";
import { Button, Input, Select, Textarea } from "@components/shared/client";
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
  const formRef = useRef<HTMLFormElement | null>(null);

  const stepOneIncomplete = !form.name || !form.email || !form.phone;
  const stepTwoIncomplete = !date || !form.time || !shootType;

  const shootDetails = shootType ? photoshootTypes.get(shootType)! : "";

  const prevStep = () => {
    if (active === 0) return;
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    setActive((prev) => prev - 1);
  };

  const nextStep = () => {
    if (active === 3) return;

    //prevent user from going to next step without filling out information for current step
    if (active === 0 && stepOneIncomplete) return;
    if (active === 1 && stepTwoIncomplete) return;
    formRef.current?.scrollIntoView({ behavior: "smooth" });
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
      <form ref={formRef}>
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
          <Stepper.Step
            allowStepSelect={!stepOneIncomplete}
            label="Booking details"
            description="Enter booking details"
          >
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
                          className="w-7 h-7 accent-red-600"
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
              <DatePicker date={date} onChange={setDate} />
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
          <Stepper.Step allowStepSelect={!stepTwoIncomplete} label="Confirmation" description="Confirm information">
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
