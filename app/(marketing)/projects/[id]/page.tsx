//Components
import { Title, Badge } from "@aomdev/ui";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/util/formate-date";
import { transformImage } from "@/lib/transform-image";

const findProject = cache(async (id: number) => {
  const project = await prisma.projects.findUnique({ where: { id }, include: { images: true } });
  const otherProjects = await prisma.projects.findMany({
    where: { NOT: { id }, published: true },
    take: 5
  });

  return {
    project: {
      ...project,
      thumbnail:
        project?.thumbnailPublicId && project.thumbnailType
          ? transformImage("w_2000", project.thumbnailPublicId, project.thumbnailType)
          : project?.thumbnail,
      images: project?.images
        ? project.images.map(image => ({
            ...image,
            url: transformImage("w_1200", image.publicId, image.type)
          }))
        : null
    },
    otherProjects: otherProjects.map(project => ({
      ...project,
      thumbnail:
        project?.thumbnailPublicId && project.thumbnailType
          ? transformImage("w_1200", project.thumbnailPublicId, project.thumbnailType)
          : project?.thumbnail
    }))
  };
});

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = parseInt(params.id);
  if (!id) notFound();
  const { project } = await findProject(id);
  if (!project) notFound();
  return { title: project.title, description: project.description };
}

export async function generateStaticParams() {
  const ids = await prisma.projects.findMany({ where: { published: true }, select: { id: true } });

  return ids.map(id => ({ id: `${id.id}` }));
}

export default async function DynamicProjectPage({ params }: { params: { id: string } }) {
  const id = parseInt(params?.id);
  if (!id) notFound();
  const { project, otherProjects } = await findProject(id);
  if (!project) notFound();
  return (
    <>
      <section className="mt-10 w-11/12 lg:w-4/5 max-w-7xl mx-auto mb-20">
        <Link href={"/projects"} className="text-gray-300 mb-10 block">
          ← Back to projects
        </Link>
        <div className="grid grid-cols-6 lg:grid-cols-12 gap-y-10 lg:gap-20">
          <div className="col-span-full lg:col-span-7">
            <figure className="overflow-hidden rounded-md aspect-video w-full">
              <img
                src={project.thumbnail || undefined}
                alt=""
                width={"100%"}
                height={"auto"}
                className="mx-auto"
              />
            </figure>
            <Title
              order={1}
              className="font-heading font-medium text-gray-50 text-4xl lg:text-6xl leading-none mt-8 mb-8"
            >
              {project.title}
            </Title>
            <div className="mt-8">
              <p className="text-lg text-gray-100 leading-relaxed  ">{project.description}</p>
              <blockquote className=" border-l-2 border-l-primary-500 pl-2 my-10">
                <p className="italic mb-2">&quot; {project.testimonial} &quot;</p>
                <footer className="text-gray-300">
                  {project.customerName}, {project.companyName}
                </footer>
              </blockquote>
              <Title order={2} className="font-heading text-3xl lg:text-5xl font-medium mb-10">
                Images that brought this project to life
              </Title>
              <div className="space-y-4">
                {project.images
                  ? project.images.map(image => {
                      return (
                        <img
                          key={image.id}
                          src={image.url}
                          width={"100%"}
                          className="rounded-md"
                          height={"auto"}
                          loading="lazy"
                          alt=""
                        />
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-5">
            <Title order={2} className="font-heading font-medium mb-8 text-3xl lg:text-5xl">
              Other projects
            </Title>
            <div className="space-y-8 lg:space-y-6 ">
              {otherProjects.map(project => {
                return (
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex flex-col lg:flex-row gap-4 group "
                    key={project.id}
                  >
                    {project.thumbnail && (
                      <figure className="aspect-video basis-1/2 overflow-hidden rounded-md">
                        <img
                          src={project.thumbnail}
                          className="group-hover:scale-105 duration-500 ease-out"
                        />
                      </figure>
                    )}
                    <div className="basis-1/2 flex flex-col justify-between gap-2">
                      <Title
                        order={3}
                        className="font-heading font-medium text-2xl lg:text-3xl group-hover:text-primary-500 group-hover:dark:text-primary-300"
                      >
                        {project.title}
                      </Title>{" "}
                      <p className="text-gray-200 line-clamp-2">{project.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge className="capitalize">{project.type}</Badge>
                        <span className="text-gray-300 text-sm">{formatDate(project.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
