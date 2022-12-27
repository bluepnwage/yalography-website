"use client";
import { MantineProvider } from "@mantine/core";
import { DatePicker } from "../DatePicker/DatePicker";
import { FormEvent, useState, useRef } from "react";
import { Button, Input, Select, Textarea } from "@components/shared/client";
import { photoshootTypes } from "@lib/photoshoot";
import { Steps } from "./Steps";
import { Addon } from "./Addons";

import type { ShootTypes } from "@lib/photoshoot";
import { Success } from "./Success";

const selectData = Array.from(photoshootTypes).map(([key, value]) => ({ label: value.label, value: key }));

export function BookingsFormContainer() {
  return (
    <MantineProvider theme={{ colorScheme: "dark", primaryColor: "red" }}>
      <BookingsForm />
    </MantineProvider>
  );
}

type Form = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  time: string;
  description: string;
};

function BookingsForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<Partial<Form>>({});
  const [shootType, setShootType] = useState<Lowercase<ShootTypes> | "">("");
  const [date, setDate] = useState<Date | null>(null);
  const [selectedFeatures, setFeatures] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const stepOneIncomplete = !form.first_name || !form.last_name || !form.email || !form.phone;
  const stepTwoIncomplete = !date || !form.time || !shootType;

  const shootDetails = photoshootTypes.get(shootType ? shootType : "regular shoot")!;

  const prevStep = () => {
    if (currentStep === 1) return;
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentStep((prev) => prev - 1);
  };

  const nextStep = () => {
    if (currentStep === 4) return;

    //prevent user from going to next step without filling out information for current step
    if (currentStep === 1 && stepOneIncomplete) return;
    if (currentStep === 2 && stepTwoIncomplete) return;
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentStep((prev) => prev + 1);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      setCurrentStep(5);
      setForm({});
      setFeatures([]);
      setDate(null);
    }
  };

  const prevDisabled = currentStep === 1;

  return (
    <>
      <div
        ref={containerRef}
        style={{ minHeight: 600 }}
        className="rounded-md ring-1 ring-black ring-opacity-5 dark:ring-0 bg-white dark:bg-zinc-800 w-9/12 p-3 flex overflow-hidden"
      >
        <div className="basis-1/3  rounded-md relative">
          <Steps currentStep={currentStep} />
        </div>
        {currentStep < 5 && (
          <form onSubmit={handleSubmit} className="basis-2/3 py-5 px-16 flex flex-col justify-between">
            {currentStep === 1 && (
              <section className="space-y-4 mb-5">
                <h2 className="text-marine-blue font-bold text-2xl mb-2">Personal info</h2>
                <p className="text-gray-400 mb-14">Please provide your name, email address, and phone number.</p>
                <Input
                  id="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  name={"first_name"}
                  label={"First Name"}
                  placeholder={"e.g. Stephen"}
                />
                <Input
                  id="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  name={"last_name"}
                  label={"Last Name"}
                  placeholder={"e.g. King"}
                />
                <Input
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  name={"email"}
                  label={"Email Address"}
                  placeholder={"e.g. stephen.king@lorem.com"}
                />
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  name={"phone"}
                  label={"Phone Number"}
                  placeholder={"555 555-555"}
                />
              </section>
            )}
            {currentStep === 2 && (
              <section className="space-y-5">
                <h2 className="text-marine-blue font-bold text-2xl">Select your photoshoot</h2>
                <p className="text-gray-400 mb-14">You have the option of monthly or yearly billing.</p>
                <Select
                  placeholder="Photoshoot type"
                  value={shootType}
                  onValueChange={(value: typeof shootType) => setShootType(value)}
                  data={selectData}
                />
                <DatePicker date={date} onChange={setDate} />
                <Input
                  className="accent-red-600 w-full"
                  label="Time"
                  type={"time"}
                  value={form?.time}
                  onChange={handleChange}
                  name="time"
                  id="time"
                />
                <Textarea
                  value={form?.description}
                  onChange={handleChange}
                  name="description"
                  id="description"
                  label="Description"
                  rows={3}
                  className="w-full"
                />
              </section>
            )}
            {currentStep === 3 && (
              <section>
                <h2 className="text-marine-blue font-bold text-2xl">Pick add-ons</h2>
                <p className="text-gray-400 mb-14">Add-ons help enhance your gaming experience..</p>
                {shootDetails && (
                  <div className="space-y-4 mb-5">
                    {shootDetails.features.map((feature) => {
                      const value = feature.label.toLowerCase();
                      const checked = selectedFeatures.includes(value);
                      return (
                        <Addon
                          key={feature.label}
                          checked={checked}
                          onChange={onFeatureChange}
                          feature={feature}
                          value={value}
                        />
                      );
                    })}
                  </div>
                )}
              </section>
            )}
            {currentStep === 4 && (
              <section>
                <h2 className="text-marine-blue font-bold text-2xl">Finishing up</h2>
                <p className="text-gray-400 mb-14">Double check everything before submitting</p>
                <div className="space-y-4 rounded-md mb-5">
                  <div className="space-y-2">
                    <p className="font-semibold text-lg text-center">{shootDetails.label} shoot</p>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="block mx-auto underline text-gray-600 dark:text-gray-400"
                    >
                      Change
                    </button>
                  </div>
                  <hr className="h-1 w-full my-2 border-zinc-400 dark:border-zinc-700" />
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Name:</span> {form.first_name}{" "}
                    {form.last_name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Email:</span> {form.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Phone number:</span> {form.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Date:</span> {date?.toDateString()}
                    , {form.time}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Comments:</span> {form.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 capitalize">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Add-ons:</span>{" "}
                    {selectedFeatures.join(", ")}
                  </p>
                </div>
              </section>
            )}
            <div className={`flex ${currentStep !== 1 ? "justify-between" : "justify-end"}`}>
              {currentStep !== 1 && (
                <Button type={"button"} disabled={prevDisabled} intent="secondary" onClick={prevStep}>
                  Previous Step
                </Button>
              )}
              {currentStep < 4 && (
                <Button type={"button"} onClick={nextStep}>
                  Next Step
                </Button>
              )}
              {currentStep === 4 && <Button>Submit</Button>}
            </div>
          </form>
        )}
        {currentStep === 5 && <Success onClick={() => setCurrentStep(1)} />}
      </div>
    </>
  );
}
