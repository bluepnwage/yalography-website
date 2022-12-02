import { Grid, Section, Title } from "@components/shared";
import * as Icon from "./icons/index";

import { ServiceCard } from "./ServiceCard";
import type { PropTypes as ServiceCardProps } from "./ServiceCard";

const serviceTypes: ServiceCardProps[] = [
  { title: "Maternity Photography", Icon: Icon.Maternity },
  { title: "Wedding Photography", Icon: Icon.Bouquet },
  { title: "Commercial Photography", Icon: Icon.Globe },
  { title: "Portrait Photography", Icon: Icon.Person },
  { title: "Event Photography", Icon: Icon.Ballon },
  { title: "Decor Photography", Icon: Icon.BoxArchive }
];

export function Services() {
  return (
    <Section>
      <header className="space-y-2 mb-10 text-center">
        <Title order={"h2"} color="red" size={"md"}>
          Services
        </Title>
        <Title order={"h3"}>What we offer</Title>
      </header>
      <Grid gap={"lg"}>
        {serviceTypes.map((service, key) => {
          return <ServiceCard {...service} key={key} />;
        })}
      </Grid>
    </Section>
  );
}
