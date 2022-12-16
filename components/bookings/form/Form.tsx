"use client";
import { MantineProvider, Stepper } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { FormEvent, useState } from "react";
import { Button } from "@components/shared";
import { Input } from "@components/shared/Input";
import { Select } from "@components/shared/Select";
import { Textarea } from "@components/shared/Textarea";

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
  const [shootType, setShootType] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const prevStep = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (active === 0) return;
    setActive((prev) => prev - 1);
  };

  const nextStep = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (active === 3) return;
    setActive((prev) => prev + 1);
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form>
        <Stepper
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
                onValueChange={setShootType}
                placeholder="Photoshoot type"
                data={[
                  { value: "wedding", label: "Wedding" },
                  { value: "portrait", label: "Portrait" }
                ]}
              />
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
            <section className="text-center text-lg">
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
              <p className="font-bold text-2xl my-4">Reservation details</p>
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
