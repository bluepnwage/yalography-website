import { Badge, Title, Button, Breadcrumbs, Anchor } from "@components/shared";
import { Dropdown } from "@components/shared/Dropdown";
import { Input } from "@components/shared/Input";

export default function Page() {
  return (
    <>
      <div className="border-b flex justify-between p-5 -mx-5 -mt-5 mb-5 border-zinc-300 dark:border-zinc-600">
        <div>
          <Title color={"red"} size={"sm"}>
            Project
          </Title>
          <div className="flex items-end gap-4">
            <Title order={"h2"}>My project</Title>
            <Badge color={"green"}>Published</Badge>
          </div>
        </div>
        <Dropdown.Root>
          <Dropdown.Trigger>
            <button className="bg-zinc-700 rounded-full h-7 w-7 flex justify-center items-center">T</button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Unpublish</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
            <Dropdown.Item>Share</Dropdown.Item>
            <Dropdown.Item>Copy link</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
      <Breadcrumbs>
        <Anchor href={"/admin/projects"}>Projects</Anchor>
        <Anchor href={"/admin/projects/published"}>Published </Anchor>
        <Anchor href={"/admin/projects/published/random-project"}>Random project</Anchor>
      </Breadcrumbs>
      <div className="flex flex-col mt-10 items-center">
        <form className="space-y-4">
          <Input label="Title" />
          <Input label="thumbnail" type={"file"} />
          <Input label="Description" />
          <Input label="Customer" />
          <Input label="Customer company" />
          <Input label="Testimonial" />
        </form>
        <Button intent="accept">Save</Button>
      </div>
    </>
  );
}
