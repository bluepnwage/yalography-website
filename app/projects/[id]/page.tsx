import { Breadcrumbs, Thumbnail, Descrption, Gallery } from "@components/dynamic-project";
import { Section, Title } from "@components/shared";

export default function DynamicProjectPage() {
  return (
    <>
      <Thumbnail />
      <Section>
        <div className="w-11/12">
          <Breadcrumbs />
          <Title className="mt-20 text-center mb-20">Title for project</Title>
          <Descrption />
          <Gallery />
        </div>
      </Section>
    </>
  );
}
