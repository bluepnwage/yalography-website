import { ProjectDropdown } from "@/components/admin/projects/project-dropdown";
import { Title, Badge } from "@aomdev/ui";

import prisma from "@/lib/prisma";
import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { ProjectForm } from "@/components/admin/projects/project-form";
import { transformImage } from "@/lib/transform-image";

const getProject = cache(async (id: number) => {
  const project = await prisma.projects.findUnique({ where: { id }, include: { images: true } });

  if (!project) notFound();
  return {
    ...project,
    createdAt: project.createdAt.toDateString(),
    thumbnail:
      project.thumbnailPublicId && project.thumbnailType
        ? transformImage("w_900", project.thumbnailPublicId, project.thumbnailType)
        : project.thumbnail
  };
});

const getGalleryImages = cache(async () => {
  const images = await prisma.images.findMany();

  return images.map(image => ({ ...image, url: transformImage("w_1000", image.publicId, image.type) }));
});

export type ProjectData = Awaited<ReturnType<typeof getProject>>;

export default async function Page({ params }: { params: { status: "drafted" | "published"; id: string } }) {
  const id = parseInt(params.id);
  if (!id) notFound();
  const imagesPromise = getGalleryImages();
  const projectPromise = getProject(id);

  const [images, project] = await Promise.all([imagesPromise, projectPromise]);

  return (
    <>
      <div className="flex gap-5">
        <div className="basis-4/5 mb-32">
          <div className="border-b sticky bg-white dark:bg-neutral-900 top-0 mb-8 -mt-5 pt-5 z-[50]  border-gray-200 dark:border-gray-700 flex justify-between pb-4">
            <div className="flex text-sm gap-4 items-center text-gray-500 dark:text-gray-200">
              <Link href={"/admin"}>
                <IconHome size={14} className="dark:text-gray-200 hover:stroke-primary-300" />
              </Link>
              <IconChevronRight size={14} className="dark:text-gray-200" />
              <Link href={"/admin/projects"} className=" dark:text-gray-200 hover:text-primary-300">
                Projects
              </Link>
              <IconChevronRight size={14} className="dark:text-gray-200" />
              <span>5</span>
            </div>
            <ProjectDropdown name={project.name} id={project.id} published={project.published} />
          </div>
          <header className="mx-auto w-2/4 mb-16">
            <Title order={1} className="font-heading font-bold text-5xl text-gray-900 dark:text-gray-50">
              {project.name}
            </Title>
          </header>
          <ProjectForm project={project} galleryImages={images} />
        </div>
        <Sidebar project={project} />
      </div>
    </>
  );
}

type PropTypes = {
  project: ProjectData;
};

function Sidebar({ project }: PropTypes) {
  return (
    <div className="basis-1/5    ">
      <div className="pt-14 px-4 top-5 [height:calc(90vh)] sticky  border-l border-l-gray-200 dark:border-l-gray-700">
        <p className="font-medium text-lg mb-8 text-gray-900 dark:text-gray-50">Details</p>
        <ul className="space-y-4 dark:text-gray-300 mb-8 capitalize">
          <li className="flex justify-between">
            <span className="font-medium dark:text-gray-100">Status</span>{" "}
            <Badge variant={"status"} color={getStatusColor(project.published)}>
              {project.published ? "Published" : "Drafted"}
            </Badge>
          </li>
          <li className="flex justify-between">
            <span className="font-medium dark:text-gray-100">Title</span>
            {project.title}
          </li>
          <li className="flex justify-between">
            <span className="font-medium dark:text-gray-100">Company</span>
            {project.companyName}
          </li>
          <li className="flex justify-between">
            <span className="font-medium dark:text-gray-100">Customer name</span> {project.customerName}
          </li>
          <li className="flex justify-between">
            <span className="font-medium dark:text-gray-100">Date</span>{" "}
            {formatDate(new Date(project.createdAt))}
          </li>
          <li className="flex justify-between">
            <span className="font-medium dark:text-gray-100">Shoot type</span> {project.type}
          </li>
        </ul>
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
  return formatter.format(date);
}

function getStatusColor(status: boolean) {
  return status ? "success" : "warn";
}
