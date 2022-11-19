import { Button, Section } from "@components/shared";
import Image from "next/image";
import heroImg from "@public/main-image.jpg";
import { bgGradient } from "@lib/gradient";

export function Hero() {
  return (
    <Section style={{ height: "calc(100vh - 64px)" }}>
      <div className="grid grid-cols-2 gap-5 bg-zinc-800 h-full items-stretch">
        <div className="flex flex-col justify-center pl-5 ">
          <header className="mb-7">
            <h1 className="font-bold text-6xl text-gray-100">
              Capturing your <br />
              <span className={`${bgGradient} bg-clip-text text-transparent`}>special moments</span>{" "}
            </h1>
          </header>
          <p className="leading-loose mb-4 text-lg">
            Magna in sit ea aliquip nostrud ex nostrud in dolore Lorem aliquip ut. Anim quis consequat nisi
            reprehenderit consequat. Ipsum cillum consequat consectetur qui adipisicing. Incididunt do commodo
            incididunt excepteur tempor enim non incididunt magna cupidatat. Irure pariatur cupidatat irure esse
            consectetur aute exercitation. Eiusmod velit ad dolore sint incididunt ipsum enim.
          </p>
          <Button>Request Session</Button>
        </div>
        <figure className="h-full w-full overflow-hidden">
          <Image priority src={heroImg} alt={"Official logo"} className="w-full h-full " />
        </figure>
      </div>
    </Section>
  );
}
