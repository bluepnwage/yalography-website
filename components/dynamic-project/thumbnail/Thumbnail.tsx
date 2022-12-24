import Image from "next/image";
import pixel from "@public/pixel.jpg";

export function Thumbnail() {
  return (
    <div className="mb-10">
      <Image src={pixel} alt={""} style={{ objectFit: "cover", height: "50vh" }} />
    </div>
  );
}
