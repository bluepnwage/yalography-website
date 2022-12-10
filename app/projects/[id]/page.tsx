import { Thumbnail, Descrption, Gallery } from "@components/dynamic-project";
import { Section, Title, Breadcrumbs, Anchor } from "@components/shared";

export default function DynamicProjectPage() {
  return (
    <>
      <Thumbnail />
      <Section>
        <div className="w-11/12">
          <Breadcrumbs>
            <Anchor href={"/"}>Home</Anchor>
            <Anchor href={"/projects"}>Projects</Anchor>
            <Anchor href={"/projects/test"}>Project name</Anchor>
          </Breadcrumbs>
          <Title className="mt-20 text-center mb-20">Title for project</Title>
          <Descrption />
          <Gallery />
        </div>
      </Section>
    </>
  );
}
