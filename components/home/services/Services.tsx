import { Grid, Section } from "@components/shared";
import * as Icon from "./icons/index";

import { ServiceCard } from "./ServiceCard";
import type { PropTypes as ServiceCardProps } from "./ServiceCard";

const serviceTypes: ServiceCardProps[] = [
  { title: "Maternity Photography", Icon: Icon.Maternity },
  { title: "Wedding Photography", Icon: Icon.Bouquet },
  { title: "Family Photography", Icon: Icon.Family },
  { title: "Portrait Photography", Icon: Icon.Person },
  { title: "Event Photography", Icon: Icon.Ballon },
  { title: "Decor Photography", Icon: Icon.BoxArchive }
];

export function Services() {
  return (
    <Section>
      <header className="space-y-2 mb-10 text-center">
        <h2 className="text-red-500 font-bold text-sm">Services</h2>
        <h3 className="text-gray-100 font-bold text-3xl">What we offer</h3>
      </header>
      <Grid width="w-11/12" gap="gap-5">
        {serviceTypes.map((service, key) => {
          return <ServiceCard {...service} key={key} />;
        })}
      </Grid>
    </Section>
  );
}
