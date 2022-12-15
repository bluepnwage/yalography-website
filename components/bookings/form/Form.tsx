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

function BookingsForm() {
  const [active, setActive] = useState(0);

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
              <Input label="Name" name="name" className="w-full" />
              <Input label="Email" type={"email"} name="email" className="w-full" />
              <Input label="Phone" type={"tel"} name="phone" className="w-full" />
            </section>
          </Stepper.Step>
          <Stepper.Step label="Reservation details" description="Enter reservation details">
            <section className="space-y-4">
              <Select
                placeholder="Service type"
                data={[
                  { value: "wedding", label: "Wedding" },
                  { value: "portrait", label: "Portrait" }
                ]}
              />
              <DatePicker
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
              <Input label="Time" type={"time"} className="accent-red-600 w-full" />
              <Textarea rows={3} label="Description" className="w-full" />
            </section>
          </Stepper.Step>
          <Stepper.Step label="Confirmation" description="Confirm information"></Stepper.Step>
          <Stepper.Completed>Your reservation has been booked!</Stepper.Completed>
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
