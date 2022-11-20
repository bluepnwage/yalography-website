import Image from "next/image";
import pixel from "@public/pixel.jpg";
import { Badge, Anchor } from "@components/shared";

export function Project() {
  return (
    <div className="bg-zinc-800 rounded-md flex flex-col col-span-3 gap-4 overflow-hidden ">
      <figure className="basis-1/3">
        <Image src={pixel} alt={""} className="h-full w-full" />
      </figure>
      <div className="p-4 space-y-4">
        <div className="flex justify-between basis-2/3">
          <h3 className="font-bold text-2xl text-gray-100 ">Pixel art</h3>
          <Badge color="green">Wedding</Badge>
        </div>
        <p>
          Quis nostrud velit aliquip sint aliquip consectetur. Consequat aliqua irure elit do culpa non commodo id non
          voluptate qui velit reprehenderit. Ea laborum do Lorem ut consequat aute.
        </p>
        <Anchor href={"#"} className="block">
          View project
        </Anchor>
      </div>
    </div>
  );
}
