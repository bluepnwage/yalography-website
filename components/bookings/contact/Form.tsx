"use client";
import { SubmitButton } from "@/components/submit-button";
import { useToggle } from "@/lib/hooks/useToggle";
import { TextInput, Textarea } from "@aomdev/ui";
import { useToast } from "react-toastify";

type PropTypes = {
  onAction: (formData: FormData) => Promise<void>;
};

export function Form({ onAction }: PropTypes) {
  const [toggle, handler] = useToggle();
  const onSubmit = async (formData: FormData) => {
    const { toast } = await import("react-hot-toast");
    await onAction(formData);
    toast.success("Email sent! We will get in touch with you shortly.", {
      duration: 5000,
      position: "top-center"
    });
    handler.toggle();
  };

  return (
    <form action={onSubmit} className="space-y-8" key={`${toggle}`}>
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
      <SubmitButton fullWidth>Let&apos;s talk</SubmitButton>
    </form>
  );
}
