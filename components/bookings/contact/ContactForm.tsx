import { Title } from "@aomdev/ui";
import resend from "@/lib/resend";
import { Form } from "./Form";
import { ToastProvider } from "@/app/(admin)/toast-provider";

type PropTypes = {
  firstName: string;
  lastName: string;
  description: string;
  phone: string;
  email: string;
};

function EmailTemplate({ description, firstName, lastName, email, phone }: PropTypes) {
  return (
    <>
      <p>
        New email from {firstName} {lastName}:
      </p>
      <p>{description}</p>
      <p>Contact information:</p>
      <ul>
        <li>Email: {email}</li>
        <li>Phone number: {phone}</li>
      </ul>
    </>
  );
}

export function ContactForm() {
  const onSubmit = async (formData: FormData) => {
    "use server";
    const form = Object.fromEntries(formData);
    await resend.emails.send({
      from: `Yalography <onboarding@resend.dev>`,
      subject: form.subject.toString(),
      to: "activeoutremer@gmail.com",
      react: EmailTemplate({
        description: form.message.toString(),
        firstName: form.first_name.toString(),
        lastName: form.last_name.toString(),
        email: form.email.toString(),
        phone: form.number.toString()
      })
    });
  };

  return (
    <section className="my-24" id="contact">
      <div className="  max-w-xl mx-auto">
        <header className="mb-16 text-center">
          <Title className="mb-6 font-heading font-medium text-5xl" order={2}>
            Get in touch
          </Title>
          <p className="text-lg text-gray-200">
            You can reach us anytime at{" "}
            <a href="mailto:yalography@gmail.com" className="inline text-primary-500 dark:text-primary-300">
              yalography@gmail.com
            </a>
          </p>
        </header>
        <ToastProvider />
        <Form onAction={onSubmit} />
      </div>
    </section>
  );
}
