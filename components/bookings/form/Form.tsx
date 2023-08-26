"use client";
//Components
import { MantineProvider } from "@mantine/core";

import { Steps } from "./Steps";
import { Addon } from "./Addons";
import { Success } from "./Success";
import dynamic from "next/dynamic";
import { Select, Button, Textarea, TextInput, Radio, Calendar, Popover } from "@aomdev/ui";
import { useForm } from "./useBookingsForm";

const DatePicker = dynamic(
  () => import("@/components/shared/DatePicker/DatePicker").then(mod => mod.DatePicker),
  {
    loading: () => <TextInput label="Date" />
  }
);

//Data/hooks
import { useState, useRef } from "react";
import { photoshootTypes } from "@/lib/photoshoot";
import { useToggle } from "@/lib/hooks/useToggle";
import dayjs from "dayjs";

//Types
import type { FormEvent } from "react";
import type { ShootTypes } from "@/lib/photoshoot";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";

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
  environment: "inside" | "outside";
};

function BookingsForm() {
  const { contact, details, validate } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [selectedFeatures, setFeatures] = useState<string[]>([]);
  const [loading, toggle] = useToggle();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const shootType1 = (details.state.shootType?.value as unknown as Lowercase<ShootTypes>) || "regular shoot";
  const shootDetails = photoshootTypes.get(shootType1)!;

  const prevStep = () => {
    if (currentStep === 1) return;
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentStep(prev => prev - 1);
  };

  const nextStep = () => {
    let error = false;
    if (currentStep === 4) return;
    if (currentStep === 1) {
      error = validate("contact");
    } else if (currentStep === 2) {
      error = validate("details");
    }
    if (error) {
      return;
    }
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentStep(prev => prev + 1);
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) => {
    const { name, value } = e.currentTarget;
    if (currentStep === 1) {
      contact.dispatch({ type: "change", payload: { value, error: false }, key: name as any });
    } else if (currentStep === 2) {
      details.dispatch({ key: name, payload: { value, error: false }, type: "change" });
    }
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
    const { toast } = await import("react-toastify");
    try {
      const data = {
        firstName: contact.state.first_name.value!,
        lastName: contact.state.last_name.value!,
        email: contact.state.email.value!,
        phone: contact.state.phone.value!,
        time: details.state.time?.value!,
        description: details.state.description?.value! || null,
        date: details.state.date?.value!,
        type: shootType1,
        environment: details.state.environment?.value === "inside" || false,
        features: selectedFeatures.join(",")
      };
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setCurrentStep(5);
        contact.dispatch({ type: "reset" });
        details.dispatch({ type: "reset" });
        setFeatures([]);
        setDate(undefined);
      } else {
        const json = await res.json();
        throw new Error(json.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          `There was an error when creating your booking. Please try again. If this problem persists, please contact our support team.`
        );
      }
    } finally {
      toggle.off();
    }
  };

  const prevDisabled = currentStep === 1;

  return (
    <>
      <div
        ref={containerRef}
        style={{ minHeight: 600 }}
        className={cardStyles({
          className: "w-11/12 lg:w-9/12  flex flex-col lg:flex-row overflow-hidden"
        })}
      >
        <div className="basis-1/3 grow  rounded-md relative">
          <Steps currentStep={currentStep} />
        </div>
        {currentStep < 5 && (
          <form
            onSubmit={handleSubmit}
            className="basis-2/3 grow py-5 px-4 lg:px-16 flex flex-col justify-between"
          >
            {currentStep === 1 && (
              <section className="space-y-4">
                <h2 className="text-marine-blue font-bold text-2xl mb-2">Personal info</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-14">
                  Please provide your name, email address, and phone number.
                </p>
                <TextInput
                  id="first_name"
                  value={contact.state.first_name.value}
                  // error={contact.state.first_name.error}
                  onChange={handleChange}
                  name={"first_name"}
                  label={"First Name"}
                  placeholder={"e.g. Stephen"}
                  required
                />
                <TextInput
                  id="last_name"
                  value={contact.state.last_name.value}
                  // error={contact.state.last_name.error}
                  onChange={handleChange}
                  name={"last_name"}
                  label={"Last Name"}
                  placeholder={"e.g. King"}
                  required
                />
                <TextInput
                  id="email"
                  value={contact.state.email.value}
                  onChange={handleChange}
                  // error={contact.state.email.error}
                  name={"email"}
                  label={"Email Address"}
                  placeholder={"e.g. stephen.king@lorem.com"}
                  required
                />
                <TextInput
                  id="phone"
                  value={contact.state.phone.value}
                  // error={contact.state.phone.error}
                  onChange={handleChange}
                  name={"phone"}
                  label={"Phone Number"}
                  placeholder={"555 555-555"}
                  required
                />
              </section>
            )}
            {currentStep === 2 && (
              <section className="space-y-5">
                <h2 className="text-marine-blue font-bold text-2xl">Select your photoshoot</h2>

                <Select
                  fullWidth
                  placeholder="Photoshoot type"
                  value={details.state.shootType?.value || undefined}
                  onValueChange={value =>
                    details.dispatch({ key: "shootType", type: "change", payload: { value, error: false } })
                  }
                  items={selectData}
                  required
                />
                {details.state.environment?.error && (
                  <span className="text-sm block mt-2 text-error-600 dark:text-error-400">
                    Please select a photoshoot type.
                  </span>
                )}

                <fieldset>
                  <legend className="mb-2">
                    Environment:{" "}
                    <span aria-label="required" className="text-red-600 inline-block ml-1 dark:text-red-500">
                      *
                    </span>
                  </legend>
                  <Radio
                    value={details.state.environment?.value}
                    onValueChange={value =>
                      details.dispatch({
                        type: "change",
                        payload: { value, error: false },
                        key: "environment"
                      })
                    }
                    name="environment"
                    required
                  >
                    <Radio.Item label="Inside" id="inside" value={"inside"} />
                    <Radio.Item label="Outside" value="outside" />
                  </Radio>

                  {details.state.environment?.error && (
                    <span className="text-sm block mt-2 text-error-600 dark:text-error-400">
                      Please select one of the options.
                    </span>
                  )}
                </fieldset>
                <Popover>
                  <Popover.Trigger className={inputStyles({ className: "w-full text-start px-2" })}>
                    {details.state.date?.value ? details.state.date.value.toLocaleDateString() : "Date"}
                  </Popover.Trigger>
                  <Popover.Content className={cardStyles()}>
                    <Calendar
                      onSelect={value =>
                        details.dispatch({
                          type: "change",
                          key: "date",
                          payload: { value: value || null, error: false }
                        })
                      }
                      selected={details.state.date?.value}
                      disabled={[{ before: new Date() }]}
                      mode="single"
                    />
                  </Popover.Content>
                </Popover>
                <TextInput
                  className="accent-red-600 w-full"
                  label="Time"
                  type={"time"}
                  value={details.state.time?.value}
                  // error={details.state.time?.error}
                  onChange={handleChange}
                  name="time"
                  id="time"
                  required
                />
                <Textarea
                  value={details.state.description?.value}
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
                <h2 className="text-marine-blue font-bold text-2xl mb-14">Pick add-ons</h2>
                {shootDetails && (
                  <div className="space-y-4">
                    {shootDetails.features.length > 0 &&
                      shootDetails.features.map(feature => {
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
                    {shootDetails.features.length === 0 && (
                      <div className="flex h-full justify-center">
                        <p className="text-xl">
                          There are no add-ons for <strong>{shootDetails.label}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}
            {currentStep === 4 && (
              <section>
                <h2 className="text-marine-blue font-bold text-2xl">Finishing up</h2>
                <p className="text-gray-400 mb-14">Double check everything before submitting</p>
                <div className="space-y-4 rounded-md">
                  <div className="space-y-2">
                    <p className="font-semibold text-lg text-center">{shootDetails.label}</p>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="block mx-auto underline text-gray-600 dark:text-gray-400"
                    >
                      Change
                    </button>
                  </div>
                  <hr className="h-1 w-full my-2 border-zinc-400 dark:border-zinc-700" />
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Name:</span>{" "}
                    {contact.state.first_name?.value} {contact.state.last_name?.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Email:</span>{" "}
                    {contact.state.email?.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Phone number:</span>{" "}
                    {contact.state.phone?.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Environment:</span>{" "}
                    {details.state.environment?.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Date:</span>{" "}
                    {details.state.date?.value?.toDateString()}, {details.state.time?.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Comments:</span>{" "}
                    {details.state.description?.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 capitalize">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Add-ons:</span>{" "}
                    {selectedFeatures.join(", ")}
                  </p>
                </div>
              </section>
            )}
            <div className={`flex  mt-5 ${currentStep !== 1 ? "justify-between" : "justify-end"}`}>
              {currentStep !== 1 && (
                <Button type={"button"} disabled={prevDisabled} variant="neutral" onClick={prevStep}>
                  Previous Step
                </Button>
              )}
              {currentStep < 4 && (
                <Button type={"button"} onClick={nextStep}>
                  Next Step
                </Button>
              )}
              {currentStep === 4 && <Button disabled={loading}>Submit</Button>}
            </div>
          </form>
        )}
        {currentStep === 5 && <Success onClick={() => setCurrentStep(1)} />}
      </div>
    </>
  );
}
