"use client";
import { MantineProvider, Stepper, TextInput, Textarea, Select } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { FormEvent, useState } from "react";
import { Button } from "@components/shared";

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
    <div className="bg-zinc-800 rounded-md p-10">
      <form>
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Contact information" description="Enter contact info">
            <section className="space-y-4">
              <TextInput label="Name" name="name" />
              <TextInput label="Email" type={"email"} name="email" />
              <TextInput label="Phone" type={"tel"} name="phone" />
            </section>
          </Stepper.Step>
          <Stepper.Step label="Reservation details" description="Enter reservation details">
            <section className="space-y-4">
              <Select
                label="Service type"
                data={[
                  { value: "wedding", label: "Wedding" },
                  { value: "portrait", label: "Portrait" }
                ]}
              />
              <DatePicker label="Date" />
              <TimeInput label="Time" />
              <Textarea label="Description" />
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
    </div>
  );
}
