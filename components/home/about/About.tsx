import { Grid, Section, Button } from "@components/shared";
import Image from "next/image";
import photographer from "@public/photographer-lg.jpg";
import { Stats } from "./Stats";

export function AboutSection() {
  return (
    <Section>
      <Grid width="w-11/12" gap="gap-5">
        <figure className="col-span-full lg:col-span-4 bg-red-600">
          <Image src={photographer} alt={""} />
        </figure>
        <div className="col-span-full lg:col-span-7 p-5">
          <header className="mb-7">
            <h2 className="font-bold text-red-500 text-sm mb-2">About</h2>
            <h3 className="font-bold text-3xl text-gray-100">Yalography</h3>
          </header>
          <p className="leading-loose text-lg mb-10">
            Dolore aute consequat sint ex est. Nisi eiusmod enim consequat quis incididunt dolor cupidatat incididunt eu
            est officia cillum esse. Aute duis laboris excepteur nisi amet eiusmod commodo in ut. Deserunt magna cillum
            enim deserunt qui sint mollit reprehenderit. Veniam occaecat sunt occaecat nisi magna et anim dolore
            voluptate.
          </p>
          <Stats />
          <Button style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}>View gallery</Button>
        </div>
      </Grid>
    </Section>
  );
}
