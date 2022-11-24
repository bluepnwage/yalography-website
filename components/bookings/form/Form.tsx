"use client";
import { MantineProvider, Stepper, TextInput, Textarea, Select } from "@mantine/core";
import { DatePicker, TimeInput, TimeRangeInput } from "@mantine/dates";
import { useState } from "react";

export function BookingsFormContainer() {
  return (
    <MantineProvider theme={{ colorScheme: "dark", primaryColor: "red" }}>
      <BookingsForm />
    </MantineProvider>
  );
}

function BookingsForm() {
  const [active, setActive] = useState(0);
  return (
    <form className="bg-zinc-800 p-10 rounded-md mt-10">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="1" description="Enter contact info">
          <section className="space-y-4">
            <TextInput label="Name" name="name" />
            <TextInput label="Email" type={"email"} name="email" />
            <TextInput label="Phone" type={"tel"} name="phone" />
          </section>
        </Stepper.Step>
        <Stepper.Step label="2" description="Enter reservation details">
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
            <TimeRangeInput />
            <Textarea label="Description" />
          </section>
        </Stepper.Step>
        <Stepper.Step label="3" description="Confirm information"></Stepper.Step>
        <Stepper.Completed>Your reservation has been booked!</Stepper.Completed>
      </Stepper>
    </form>
  );
}
