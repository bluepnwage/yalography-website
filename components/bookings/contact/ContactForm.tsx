import { Title } from "@aomdev/ui";
import { Form } from "./Form";
import { ToastProvider } from "@/app/(admin)/toast-provider";

export function ContactForm() {
  return (
    <section className="my-24" id="contact">
      <div className="  max-w-xl mx-auto">
        <header className="mb-16 text-center">
          <Title className="mb-6 font-heading font-medium text-5xl" order={2}>
            Get in touch
          </Title>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            You can reach us anytime at{" "}
            <a href="mailto:yalography@gmail.com" className="inline text-primary-500 dark:text-primary-300">
              yalography@gmail.com
            </a>
          </p>
        </header>
        <ToastProvider />
        <Form />
      </div>
    </section>
  );
}
