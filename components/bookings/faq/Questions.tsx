import { Anchor, Grid, Section, Title } from "@components/shared";

export function Questions() {
  return (
    <Section>
      <Grid>
        <div className="col-span-5">
          <Title order={"h2"} className="mb-2">
            Frequently asked questions
          </Title>
          <p>
            Can&apos;t find the answer you&apos;re looking for? Reach out to us via our{" "}
            <Anchor externalLink href="#contact">
              Contact form
            </Anchor>
          </p>
        </div>
        <div className="col-span-7 col-start-6">
          <p className="font-bold text-xl mb-2">Question #1</p>
          <p>
            Aute dolore proident laborum fugiat et enim pariatur eiusmod magna consequat ullamco. Minim occaecat laborum
            qui duis ad. Nulla sint nulla occaecat sint.
          </p>
        </div>
        <div className="col-span-7 col-start-6">
          <p className="font-bold text-xl mb-2">Question #2</p>
          <p>
            Aute dolore proident laborum fugiat et enim pariatur eiusmod magna consequat ullamco. Minim occaecat laborum
            qui duis ad. Nulla sint nulla occaecat sint.
          </p>
        </div>
        <div className="col-span-7 col-start-6">
          <p className="font-bold text-xl mb-2">Question #3</p>
          <p>
            Aute dolore proident laborum fugiat et enim pariatur eiusmod magna consequat ullamco. Minim occaecat laborum
            qui duis ad. Nulla sint nulla occaecat sint.
          </p>
        </div>
      </Grid>
    </Section>
  );
}
