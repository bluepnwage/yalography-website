import { Grid, Section, Title } from "@components/shared";
import { Ballon, Bouquet, BoxArchive, Globe, Maternity, Person } from "@lib/icons";

import { ServiceCard } from "./ServiceCard";
import type { PropTypes as ServiceCardProps } from "./ServiceCard";

const serviceTypes: ServiceCardProps[] = [
  { title: "Maternity Photography", Icon: <Maternity className={"stroke-gray-100"} /> },
  { title: "Wedding Photography", Icon: <Bouquet className="fill-gray-100" /> },
  { title: "Commercial Photography", Icon: <Globe className="fill-gray-100" /> },
  { title: "Portrait Photography", Icon: <Person className={"fill-gray-100"} /> },
  { title: "Event Photography", Icon: <Ballon className="stroke-gray-100" /> },
  { title: "Decor Photography", Icon: <BoxArchive className="fill-gray-100" /> }
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
      <Grid>
        {serviceTypes.map((service, key) => {
          return <ServiceCard {...service} key={key} />;
        })}
      </Grid>
    </Section>
  );
}
