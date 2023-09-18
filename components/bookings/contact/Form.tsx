"use client";
import { useToggle } from "@/lib/hooks/useToggle";
import { Button, TextInput, Textarea } from "@aomdev/ui";
import { FormEvent } from "react";

export function Form() {
  const [toggle, handler] = useToggle();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const form = Object.fromEntries(new FormData(e.currentTarget));
    e.preventDefault();
    const { toast } = await import("react-hot-toast");
    handler.on();
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.first_name.toString(),
        lastName: form.last_name.toString(),
        subject: form.subject.toString(),
        number: form.number.toString(),
        email: form.email.toString(),
        description: form.message.toString()
      })
    });
    if (res.ok) {
      toast.success("Email sent! We will get in touch with you shortly.", {
        duration: 5000,
        position: "top-center"
      });
    } else {
      toast.error("Failed to send email");
    }
    handler.off();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8" key={`${toggle}`}>
      <div className="flex flex-col lg:flex-row w-full gap-4 grow basis-full">
        <div className="grow">
          <TextInput required className="grow" label="First name" name="first_name" id="first_name" />
        </div>
        <div className="grow">
          <TextInput
            required
            label="Last name"
            name="last_name"
            id={"last_name"}
            autoComplete={"family-name"}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 grow basis-full">
        <div className="grow">
          <TextInput required type={"email"} label={"Email"} name={"email"} id={"email"} />
        </div>
        <div className="grow">
          <TextInput required type={"tel"} label={"Phone"} name={"number"} id={"number"} />
        </div>
      </div>
      <div className="flex w-full gap-4 grow ">
        <div className="grow">
          <TextInput label="Subject" name={"subject"} id={"subject"} />
        </div>
      </div>
      <div className="w-full">
        <Textarea className="w-full" required name="message" rows={5} label="Message" />
      </div>
      <Button disabled={toggle} fullWidth>
        Let&apos;s talk
      </Button>
    </form>
  );
}
