"use client";
import { ButtonProps, Calendar, Popover, Radio, Select, Textarea, TextInput } from "@aomdev/ui";
import { Dialog } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import { useForm } from "./use-booking-form";
import { photoshootTypes, ShootTypes, PhotoShootType } from "@/lib/photoshoot";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { Addon } from "./addons";
import { motion, MotionConfig } from "framer-motion";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import { Success } from "./success";
import { createBooking } from "./actions";
import { useAction } from "@/lib/hooks/useAction";
import { toast } from "sonner";
import { useMeasure } from "@/lib/hooks/use-measure";
import { useBookingSession } from "./book-session-provider";

const selectData = Array.from(photoshootTypes).map(([key, value]) => ({ label: value.label, value: key }));

type Props = {
  buttonSize: ButtonProps["size"];
};

export function BookSession({ buttonSize }: Props) {
  const { contact, details, validate } = useBookingSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFeatures, setFeatures] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ref, height] = useMeasure();
  const {
    formAction,
    isPending,
    ref: formRef
  } = useAction(createBooking, {
    onSuccess(message) {
      contact.dispatch({ type: "reset" });
      details.dispatch({ type: "reset" });
      setFeatures([]);
      setCurrentStep(1);
      setIsOpen(false);
      toast.success(message);
    }
  });

  const prevStep = () => {
    if (currentStep === 1) return;
    setCurrentStep((prev) => prev - 1);
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
    setCurrentStep((prev) => prev + 1);
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) => {
    const { name, value } = e.currentTarget;
    if (currentStep === 1) {
      contact.dispatch({ type: "change", payload: { value, error: "" }, key: name as any });
    } else if (currentStep === 2) {
      details.dispatch({ key: name, payload: { value, error: "" }, type: "change" });
    }
  };

  const handleFeatureChange = (e: FormEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget;
    if (checked) {
      setFeatures((prev) => [...prev, value]);
    } else {
      setFeatures((prev) => prev.filter((v) => v !== value));
    }
  };

  const featureIsSelected = (value: string) => {
    return selectedFeatures.includes(value);
  };

  const shootType1 = (details.state.shootType?.value as unknown as Lowercase<ShootTypes>) || "regular shoot";
  const shootDetails = photoshootTypes.get(shootType1)!;

  return (
    <MotionConfig transition={{ duration: 0.9, type: "spring", bounce: 0 }}>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Dialog.Trigger
          size={buttonSize}
          className="w-fit z-10"
        >
          Book Session
        </Dialog.Trigger>
        <Dialog.Content
          className="w-1/4 overflow-hidden"
          asChild
        >
          <motion.div
            animate={{ height: height ? height : "auto" }}
            style={{ padding: 0 }}
          >
            <div
              ref={ref}
              className="p-4"
            >
              <div className="bg-neutral-900 -m-4 p-4  mb-4 border-b border-b-neutral-700 ">
                <div className="flex justify-between  items-center mb-4">
                  <Dialog.Title>Book session</Dialog.Title>
                  <Dialog.Close>
                    <IconX />
                  </Dialog.Close>
                </div>
                <div className="flex gap-6 justify-between">
                  <Step
                    label="Contact"
                    completed={currentStep > 1}
                    active={currentStep === 1}
                  >
                    1
                  </Step>
                  <Step
                    label="Details"
                    completed={currentStep > 2}
                    active={currentStep === 2}
                  >
                    2
                  </Step>
                  <Step
                    label="Add-ons"
                    completed={currentStep > 3}
                    active={currentStep === 3}
                  >
                    3
                  </Step>
                  <Step
                    label="Summary"
                    completed={currentStep > 4}
                    active={currentStep === 4}
                  >
                    4
                  </Step>
                </div>
              </div>
              <form
                ref={formRef}
                action={formAction}
                className="space-y-8"
              >
                <HiddenInputs
                  contact={contact}
                  details={details}
                />
                {currentStep === 1 && (
                  <ContactStep
                    contact={contact}
                    onChange={handleChange}
                  />
                )}
                {currentStep === 2 && (
                  <DetailsStep
                    details={details}
                    onChange={handleChange}
                  />
                )}
                {currentStep === 3 && (
                  <AddOnsStep
                    shootDetails={shootDetails}
                    isSelected={featureIsSelected}
                    onFeatureChange={handleFeatureChange}
                  />
                )}
                {currentStep === 4 && (
                  <SummaryStep
                    contact={contact}
                    details={details}
                    label={shootDetails.label}
                    selectedFeatures={selectedFeatures}
                  >
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="block mx-auto underline text-gray-600 dark:text-gray-400"
                    >
                      Change
                    </button>
                  </SummaryStep>
                )}
                {currentStep === 5 && <Success onClick={() => {}} />}
                <div className="flex justify-between">
                  <motion.button
                    layoutId="prev-button"
                    type="button"
                    onClick={prevStep}
                    className={buttonStyles({ variant: "neutral" })}
                  >
                    Prev
                  </motion.button>

                  {currentStep < 4 && (
                    <motion.button
                      layoutId="next-button"
                      type={"button"}
                      onClick={nextStep}
                      className={buttonStyles({})}
                    >
                      {"Next"}
                    </motion.button>
                  )}
                  {currentStep === 4 && (
                    <motion.button
                      disabled={isPending}
                      layoutId="next-button"
                      type={"submit"}
                      onClick={nextStep}
                      className={buttonStyles({})}
                    >
                      {"Submit"}
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog>
    </MotionConfig>
  );
}

type HiddenInputsProps = {
  contact: PropTypes["contact"];
  details: DetailsProps["details"];
};

function HiddenInputs({ contact, details }: HiddenInputsProps) {
  return (
    <>
      <input
        id="first_name"
        value={contact.state.first_name.value}
        name={"first_name"}
        placeholder={"e.g. Stephen"}
        hidden
      />
      <input
        id="last_name"
        value={contact.state.last_name.value}
        name={"last_name"}
        placeholder={"e.g. King"}
        hidden
      />
      <input
        id="email"
        value={contact.state.email.value}
        name={"email"}
        hidden
      />
      <input
        id="phone"
        value={contact.state.phone.value}
        name={"phone"}
        hidden
      />
      <input
        id="time"
        value={details.state.time?.value}
        name={"time"}
        hidden
      />
      <input
        id="shoot_type"
        value={details.state.shootType?.value}
        name={"shoot_type"}
        hidden
      />
      <input
        id="date"
        value={details.state.date?.value?.toDateString()}
        name={"date"}
        hidden
      />
      <input
        id="environment"
        value={details.state.environment?.value}
        name={"environment"}
        hidden
      />
      <input
        id="description"
        value={details.state.description?.value}
        name={"description"}
        hidden
      />
    </>
  );
}

function Step({
  children,
  active,
  completed,
  label
}: {
  children: React.ReactNode;
  active: boolean;
  label: string;
  completed: boolean;
}) {
  return (
    <div className="flex gap-2 items-center">
      <span
        data-active={active}
        data-completed={completed}
        className="rounded-full ring-1 ring-neutral-700 h-10 w-10 flex items-center justify-center data-[active=true]:ring-error-500 data-[completed=true]:bg-error-500 duration-150 ease"
      >
        {children}
      </span>
      <span
        data-active={active}
        className="text-gray-300 font-medium data-[active=true]:text-gray-50"
      >
        {label}
      </span>
    </div>
  );
}

type PropTypes = {
  contact: ReturnType<typeof useForm>["contact"];
  onChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) => void;
};

function ContactStep({ contact, onChange }: PropTypes) {
  return (
    <section className="space-y-4">
      <h2 className="text-marine-blue font-bold text-xl mb-2">Personal info</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-14">
        Please provide your name, email address, and phone number.
      </p>
      <TextInput
        id="first_name"
        value={contact.state.first_name.value}
        error={contact.state.first_name.error}
        onChange={onChange}
        name={"first_name"}
        label={"First Name"}
        placeholder={"e.g. Stephen"}
        required
      />
      <TextInput
        id="last_name"
        value={contact.state.last_name.value}
        error={contact.state.last_name.error}
        onChange={onChange}
        name={"last_name"}
        label={"Last Name"}
        placeholder={"e.g. King"}
        required
      />
      <TextInput
        id="email"
        value={contact.state.email.value}
        onChange={onChange}
        error={contact.state.email.error}
        name={"email"}
        label={"Email Address"}
        placeholder={"e.g. stephen.king@lorem.com"}
        required
      />
      <TextInput
        id="phone"
        value={contact.state.phone.value}
        error={contact.state.phone.error}
        onChange={onChange}
        name={"phone"}
        label={"Phone Number"}
        placeholder={"555 555-555"}
        required
      />
    </section>
  );
}

type DetailsProps = {
  details: ReturnType<typeof useForm>["details"];
  onChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) => void;
};

function DetailsStep({ details, onChange }: DetailsProps) {
  return (
    <section className="space-y-5">
      <h2 className="text-marine-blue font-bold text-2xl">Select your photoshoot</h2>

      <Select
        fullWidth
        placeholder="Photoshoot type"
        value={details.state.shootType?.value || undefined}
        onValueChange={(value) =>
          details.dispatch({ key: "shootType", type: "change", payload: { value, error: "" } })
        }
        contentProps={{ className: "z-[9999]" }}
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
          <span
            aria-label="required"
            className="text-red-600 inline-block ml-1 dark:text-red-500"
          >
            *
          </span>
        </legend>
        <Radio
          value={details.state.environment?.value}
          onValueChange={(value) =>
            details.dispatch({
              type: "change",
              payload: { value, error: "" },
              key: "environment"
            })
          }
          name="environment"
          required
        >
          <Radio.Item
            label="Inside"
            id="inside"
            value={"inside"}
          />
          <Radio.Item
            label="Outside"
            value="outside"
          />
        </Radio>

        {details.state.environment?.error && (
          <span className="text-sm block mt-2 text-error-600 dark:text-error-400">
            Please select one of the options.
          </span>
        )}
      </fieldset>
      <div>
        <Popover>
          <Popover.Trigger
            data-error={details.state.date?.error ? true : false}
            className={inputStyles({
              className: `w-full text-start px-2`
            })}
          >
            {details.state.date?.value ? details.state.date.value.toLocaleDateString() : "Date"}
          </Popover.Trigger>
          <Popover.Content className={cardStyles({ className: "z-[9999]" })}>
            <Calendar
              onSelect={(value) =>
                details.dispatch({
                  type: "change",
                  key: "date",
                  payload: { value: value || null, error: "" }
                })
              }
              selected={details.state.date?.value}
              disabled={[{ before: new Date() }]}
              mode="single"
            />
          </Popover.Content>
        </Popover>
        {details.state.date?.error && (
          <span className="text-sm block mt-2 text-error-600 dark:text-error-400">Please select a date.</span>
        )}
      </div>
      <TextInput
        className="accent-red-600 w-full"
        label="Time"
        type={"time"}
        value={details.state.time?.value}
        error={details.state.time?.error ? "Please select a time" : ""}
        onChange={onChange}
        name="time"
        id="time"
        required
      />
      <Textarea
        value={details.state.description?.value}
        onChange={onChange}
        name="description"
        id="description"
        label="Description"
        rows={3}
        className="w-full"
      />
    </section>
  );
}

type AddonProps = {
  shootDetails: PhotoShootType;
  onFeatureChange: (e: FormEvent<HTMLInputElement>) => void;
  isSelected: (value: string) => boolean;
};

function AddOnsStep({ shootDetails, onFeatureChange, isSelected }: AddonProps) {
  return (
    <section>
      <h2 className="text-marine-blue font-bold text-2xl mb-14">Pick add-ons</h2>
      {shootDetails && (
        <div className="space-y-4">
          {shootDetails.features.length > 0 &&
            shootDetails.features.map((feature) => {
              const value = feature.label.toLowerCase();
              const checked = isSelected(value);
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
  );
}

type SummaryProps = {
  contact: PropTypes["contact"];
  label: ShootTypes;
  details: DetailsProps["details"];
  selectedFeatures: string[];
  children: React.ReactNode;
};

function SummaryStep({ contact, label, details, selectedFeatures, children }: SummaryProps) {
  return (
    <section>
      <h2 className="text-marine-blue font-bold text-2xl">Finishing up</h2>
      <p className="text-gray-400 mb-14">Double check everything before submitting</p>
      <div className="space-y-4 rounded-md">
        <div className="space-y-2">
          <p className="font-semibold text-lg text-center">{label}</p>
          {children}
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
  );
}
