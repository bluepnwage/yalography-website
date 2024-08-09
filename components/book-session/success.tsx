import { Button, Title } from "@aomdev/ui";

type PropTypes = {
  onClick: () => void;
};

export function Success({ onClick }: PropTypes) {
  return (
    <div className="basis-2/3 grow py-5 px-4 lg:px-16 flex flex-col items-center justify-center ">
      <Title order={2} className="font-medium font-heading mb-6">
        Success!
      </Title>
      <p className="text-xl lg:text-center mb-4">
        We have succesfully received your request! We will email you shortly. If you have any additional
        questions, feel free to{" "}
        <a href={"#contact"} className="text-yellow-600 dark:text-yellow-500">
          contact us
        </a>
        .
      </p>
      <Button onClick={onClick}>Book another photoshoot</Button>
    </div>
  );
}
