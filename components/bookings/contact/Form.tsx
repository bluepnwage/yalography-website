"use client";
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";
import { Textarea } from "@components/shared/Textarea";
import { useToggle } from "@lib/hooks/useToggle";
import { FormProps } from "@lib/notion";
import { FormEvent, useState } from "react";

export function Form() {
  const [form, setForm] = useState<Partial<FormProps>>({});
  const [loading, toggle] = useToggle();

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { toast } = await import("react-toastify");
    toggle.on();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        toast.success("Message sent. We will be getting in touch with you as soon as possible.");
        setForm({});
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("There was an error sending your message. Please try again later");
      }
    } finally {
      toggle.off();
    }
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-evenly gap-4">
      <div className="flex flex-col lg:flex-row w-full gap-4 grow basis-full">
        <Input
          required
          onChange={handleChange}
          value={form.first_name || ""}
          wrapperClassName="basis-2/4 grow"
          label="First name"
          name="first_name"
          id="first_name"
        />
        <Input
          required
          onChange={handleChange}
          value={form.last_name || ""}
          wrapperClassName="basis-2/4 grow"
          label="Last name"
          name="last_name"
          id={"last_name"}
          autoComplete={"family-name"}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 grow basis-full">
        <Input
          required
          onChange={handleChange}
          value={form.email || ""}
          wrapperClassName="basis-2/4 grow"
          type={"email"}
          label={"Email"}
          name={"email"}
          id={"email"}
        />
        <Input
          required
          onChange={handleChange}
          value={form.number || ""}
          wrapperClassName="basis-2/4 grow"
          type={"number"}
          label={"Phone"}
          name={"number"}
          id={"number"}
        />
      </div>
      <div className="flex w-full gap-4 grow basis-full">
        <Input
          onChange={handleChange}
          value={form.subject || ""}
          wrapperClassName="basis-2/4 grow"
          label="Subject"
          name={"subject"}
          id={"subject"}
        />
      </div>
      <Textarea required value={form.message || ""} name="message" onChange={handleChange} rows={5} label="Message" />
      <Button disabled={loading} className="self-end">
        Submit message
      </Button>
    </form>
  );
}
