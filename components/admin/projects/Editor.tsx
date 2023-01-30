"use client";
import { Input } from "@components/shared/Input";
import { Select } from "@components/shared/Select";
import { TabsDemo } from "@components/shared/Tabs";
import { Textarea } from "@components/shared/Textarea";
import { Image } from "@components/shared/Image";
import { ImageDropdown } from "./ImageDropdown";
import { Dropzone } from "./Dropzone";
import { Badge } from "@components/shared/Badge";
import { Button } from "@components/shared/Button";
import { Pagination } from "@components/shared/Pagination";

import { toast } from "react-toastify";
import { useRouteRefresh } from "@lib/hooks/useRouteRefresh";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToggle } from "@lib/hooks/useToggle";
import { photoshootTypes } from "@lib/photoshoot";
import { usePagination } from "@lib/hooks/usePagination";

import type { FormEvent } from "react";
import type { SerializedProject } from "@lib/prisma";
import type { Images } from "@prisma/client";

type ProjectJoin = SerializedProject & { images: Images[] };

type PropTypes = {
  projectData: ProjectJoin;
  galleryImages: Images[];
};

export function Editor({ projectData, galleryImages }: PropTypes) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[] | null>(null);
  const [isPending, refresh] = useRouteRefresh();
  const [project, setProject] = useState(projectData);
  const [selectedType, setSelectedType] = useState(projectData.type || "");
  const [loading, toggle] = useToggle();
  const router = useRouter();
  const { paginatedList, ...props } = usePagination(4, images ? images : []);
  const { paginatedList: galleryPagination, ...galleryProps } = usePagination(
    4,
    galleryImages.filter((image) => !project.images.some((img) => img.id === image.id))
  );
  const [galleryIds, setGalleryIds] = useState<number[]>([]);
  const edited = useRef(false);

  //update state whenever the root is refreshed
  useEffect(() => {
    setProject(projectData);
  }, [projectData]);

  const thumbnailURL = thumbnail ? URL.createObjectURL(thumbnail) : project.thumbnail ? project.thumbnail : "";
  const selectData = Array.from(photoshootTypes).map(([key, value]) => ({ label: value.label, value: key }));

  const onChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const onThumbnailDrop = (file: File[] | null) => {
    if (file && file.length > 0) {
      setThumbnail(file[0]);
    }
  };

  const onImagesDrop = (files: File[] | null) => {
    if (files && files.length > 0) {
      setImages(files);
    }
  };

  const onStatus = async () => {
    //Call on save so admin woudlnt have to remember saving everytime
    await onSave(false);
    const endpoint = new URL("/api/projects", location.origin);
    endpoint.searchParams.set("revalidate", `1`);
    toggle.on();
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !project.published, id: project.id })
      });
      if (res.ok) {
        toast.success(project.published ? "Project drafted" : "Project published");
        refresh();
        router.push(`/admin/projects/${project.published ? "drafted" : "published"}/${project.id}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error(`Failed to ${project.published ? "draft" : "publish"} project. Please try again in a few minutes.`);
    } finally {
      toggle.off();
    }
  };

  //Since onStatus also calls this function,
  //Pass refreshRoot to see if we should refresh the root and revalidate
  //the projects page to avoid doing it twice
  const onSave = async (refreshRoot?: boolean) => {
    let url = project.thumbnail;
    toggle.on();
    try {
      //if theres no previous thumbnail  uploaded already
      //or
      //if theres already a previous thumbnail but the user wants to change the thumbnail
      //then upload a new thumbnail
      if ((!url && thumbnail) || (url !== thumbnailURL && thumbnail)) {
        const { uploadThumbnail } = await import("@lib/firebase/storage");
        url = await uploadThumbnail(thumbnail, project.name);
        console.log("thumbnail uploaded");
      }

      if (images && images.length > 0) {
        const { uploadImage } = await import("@lib/firebase/storage");
        const promise = images.map((image) => uploadImage(image, { projectID: project.id }));
        await Promise.all(promise);
      }

      const jsonData = {
        id: project.id,
        title: project.title || "",
        testimonial: project.testimonial || "",
        companyName: project.companyName || "",
        customerName: project.customerName || "",
        description: project.description || "",
        type: selectedType,
        thumbnail: url
      };

      const endpoint = new URL("/api/projects", location.origin);

      if (refreshRoot) {
        endpoint.searchParams.set("revalidate", project.published ? "1" : "0");
      } else {
        endpoint.searchParams.set("revalidate", "0");
      }
      if (edited.current && galleryIds.length > 0) {
        const imagesEndpoint = new URL("/api/images", location.origin);
        imagesEndpoint.searchParams.set("multiple", "1");
        const res = await fetch(imagesEndpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: galleryIds, projectId: project.id })
        });
        if (!res.ok) {
          throw new Error();
        }
      }

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData)
      });
      if (res.ok) {
        if (refreshRoot) {
          refresh();
          setImages(null);
        }
        toast.success("Project saved");
      }
    } catch (error) {
      toast.error("Failed to save changes.");
    } finally {
      toggle.off();
    }
  };

  const isLoading = isPending || loading;
  const previewDisabled =
    !project.title ||
    !project.description ||
    (project.images.length === 0 && !images && galleryIds.length === 0) ||
    (!project.thumbnail && !thumbnail);

  const unlinkImage = async (id: number) => {
    toggle.on();
    try {
      const res = await fetch("/api/images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, projectId: null })
      });
      if (res.ok) {
        refresh();
      } else throw new Error("Failed to unlink image");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      toggle.off();
    }
  };

  const deleteImage = async (id: number) => {
    toggle.on();
    try {
      const res = await fetch("/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        refresh();
      } else {
        throw new Error("Failed to delete image");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to delete image");
      }
    } finally {
      toggle.off();
    }
  };

  const deleteSelectedImage = (file: File) => {
    setImages((prev) => prev?.filter((prev) => prev.name !== file.name) || null);
  };

  const selectImage = (id: number) => {
    //If selected image is not  linked to project then mark edited as true
    if (!project.images.some((image) => image.id === id)) edited.current = true;
    setGalleryIds((prev) => [...prev, id]);
  };

  const removeImage = (id: number) => {
    setGalleryIds((prev) => prev.filter((imageID) => imageID !== id));
  };

  return (
    <>
      <Button disabled={isLoading} onClick={() => onSave(true)} className="mb-4 block" intent={"accept"}>
        Save changes
      </Button>
      <TabsDemo defaultValue="information">
        <TabsDemo.List>
          <TabsDemo.Trigger value="information">Information</TabsDemo.Trigger>
          <TabsDemo.Trigger value="customer-details">Customer details</TabsDemo.Trigger>
          <TabsDemo.Trigger value="images">Images</TabsDemo.Trigger>
          <TabsDemo.Trigger disabled={previewDisabled} value="preview">
            Preview
          </TabsDemo.Trigger>
          <TabsDemo.Trigger disabled={previewDisabled} value="card-preview">
            Card preview
          </TabsDemo.Trigger>
          <TabsDemo.Trigger disabled={previewDisabled && !project.published} value="publish">
            Publish
          </TabsDemo.Trigger>
        </TabsDemo.List>
        <TabsDemo.Content value="information">
          <section className="space-y-5">
            <Input value={project?.title || ""} onChange={onChange} label="Title" id="title" name="title" required />
            <Textarea
              value={project?.description || ""}
              onChange={onChange}
              label="Description"
              id="description"
              name="description"
            />
            <Select value={selectedType} onValueChange={setSelectedType} label="Photoshoot type" data={selectData} />
            <div className=" mt-5">
              <p>Thumbnail:</p>
              <div className="flex gap-5">
                <Dropzone onDrop={onThumbnailDrop} />
                <div className="bg-zinc-200 flex rounded-md items-center dark:bg-zinc-900 basis-2/4 grow">
                  {!thumbnailURL && <p className="text-xl mx-auto font-semibold">Thumbnail will be displayed here.</p>}
                  <img src={thumbnailURL} />
                </div>
              </div>
            </div>
          </section>
        </TabsDemo.Content>
        <TabsDemo.Content value="customer-details">
          <section className="space-y-5">
            <Input
              value={project.customerName || ""}
              onChange={onChange}
              label="Customer name"
              name="customerName"
              id="customerName"
            />
            <Input
              value={project?.companyName || ""}
              onChange={onChange}
              label="Company name"
              name="companyName"
              id="companyName"
            />
            <Textarea
              value={project?.testimonial || ""}
              onChange={onChange}
              label="Customer testimonial"
              name="testimonial"
              id="testimonial"
            />
          </section>
        </TabsDemo.Content>
        <TabsDemo.Content value="images">
          <div className="grid grid-cols-2 gap-4">
            <Dropzone multiple onDrop={onImagesDrop} />
            <div className="grid grid-cols-4 gap-4 mt-4">
              {project.images.length === 0 && (
                <p className="font-semibold text-xl col-span-full">You haven&apos;t saved any images yet.</p>
              )}
              {project.images.length > 0 && (
                <>
                  <p className="col-span-full text-xl font-semibold">Saved images</p>
                  {project.images.map((image) => {
                    return (
                      <div key={image.id} className="w-full col-span-2 relative h-full">
                        <Image
                          width={image.width}
                          height={image.height}
                          src={image.url}
                          alt={""}
                          containerClass={"w-full h-full"}
                          className="w-full h-full object-cover"
                        />
                        <ImageDropdown deleteImage={deleteImage} unlinkImage={unlinkImage} id={image.id} />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="grid grid-cols-4 col-span-full gap-4">
              <p className="col-span-full text-xl font-semibold">Selected images:</p>
              {paginatedList.map((file, key) => {
                const url = URL.createObjectURL(file);
                return (
                  <div key={file.name} className="h-full w-full flex flex-col gap-4">
                    <Image
                      key={key}
                      src={url}
                      alt={""}
                      width={300}
                      height={300}
                      containerClass={"grow"}
                      className="w-full h-full object-cover"
                    />
                    <Button className="w-fit px-2" onClick={() => deleteSelectedImage(file)}>
                      Remove image
                    </Button>
                  </div>
                );
              })}
              <div className="col-span-full">{paginatedList.length > 0 && <Pagination {...props} />}</div>
              <p className="col-span-full text-xl font-semibold">Gallery images </p>
              {galleryPagination.map((image) => {
                const selected = galleryIds.includes(image.id);
                const onClick = () => (selected ? removeImage(image.id) : selectImage(image.id));
                return (
                  <div key={image.id} className="h-full w-full flex flex-col gap-4">
                    <Image
                      src={image.url}
                      alt={""}
                      width={image.width}
                      height={image.height}
                      containerClass={`grow ring-red-600 dark:ring-red-500 ${selected ? "ring-2" : "ring-0"}`}
                      className="w-full h-full object-cover"
                    />
                    <Button intent={selected ? "reject" : "accept"} onClick={onClick}>
                      {selected ? "Remove image" : "Select image"}
                    </Button>
                  </div>
                );
              })}
              <div className="col-span-full">{galleryPagination.length > 0 && <Pagination {...galleryProps} />}</div>
            </div>
          </div>
        </TabsDemo.Content>
        <TabsDemo.Content value="preview">
          <div>
            <img src={thumbnailURL} className="w-full h-64 mb-10 object-cover" />
          </div>
          <p className="font-bold text-3xl mb7 text-center">{project.title}</p>

          <section className="grid grid-cols-2 gap-4 mb-10">
            <div>
              <h3 className="text-gray-900 text-4xl font-bold mb-2 dark:text-gray-100">Overview</h3>
              <p className="">{project?.description || ""}</p>
            </div>
            <div className="bg-white rounded-md dark:bg-zinc-800 p-2">
              <p className="text-red-600 dark:text-red-500 text-center mb-2">Testimonial</p>
              <p className="mb-4">{project.testimonial}</p>
              <strong className="block mb-4">{project.customerName}</strong>
              <p className="text-red-600 dark:text-red-500">{project.companyName}</p>
            </div>
          </section>
          <section>
            <header className="text-center">
              <h2 className="dark:text-red-500 text-red-600">Gallery</h2>
              <h3 className="dark:text-gray-100 text-2xl font-bold mb-5 :text-gray-900">
                See the images that brought this project to life
              </h3>
            </header>
            <div className="flex gap-4 flex-wrap">
              {project.images.length === 0 &&
                images?.map((image, key) => {
                  const url = URL.createObjectURL(image);
                  return (
                    <div key={key} className="basis-1/3 grow">
                      <img src={url} className="h-full w-full" />
                    </div>
                  );
                })}
              {project?.images.length > 0 &&
                project.images?.map((image, key) => {
                  return (
                    <div key={image.id} className="basis-1/3 grow">
                      <img src={image.url} className="h-full w-full" />
                    </div>
                  );
                })}
            </div>
          </section>
        </TabsDemo.Content>
        <TabsDemo.Content value="card-preview">
          <div className="bg-gray-50 ring-1 ring-black/10 dark:ring-0 dark:bg-zinc-700 flex flex-col gap-2 mx-auto w-2/6 rounded-md overflow-hidden ">
            <figure className="basis-1/3">
              <img src={thumbnailURL} className="h-full w-full" />
            </figure>
            <div className="space-y-4 p-2">
              <div className="flex gap-4 justify-between">
                <p className="font-bold basis-2/4 text-2xl">{project.title}</p>
                <Badge size={"sm"} color={"violet"} className="capitalize ">
                  {selectedType.includes("wedding") ? "Wedding" : selectedType}
                </Badge>
              </div>
              <p>{project.description}</p>
              <span className="texxt-yellow-600 dark:text-yellow-500 inline-block">View project</span>
            </div>
          </div>
        </TabsDemo.Content>
        <TabsDemo.Content value="publish">
          <section className="flex flex-col items-center">
            <div className="w-2/4 space-y-4">
              <p className="font-bold text-center text-2xl">{project.title}</p>
              <Badge color={project.published ? "emerald" : "orange"} className="w-fit inline-block mx-auto">
                {project.published ? "Published" : "Drafted"}
              </Badge>
              <hr className="h-1 border-zinc-200 dark:border-zinc-700 w-full " />
              <p className="text-gray-600 dark:text-gray-300 ">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Description:</span>{" "}
                {project.description}
              </p>
              <p className="text-gray-600 dark:text-gray-300 ">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Customer name:</span>{" "}
                {project.customerName}
              </p>
              <p className="text-gray-600 dark:text-gray-300 ">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Company name:</span>{" "}
                {project.companyName}
              </p>
              <p className="text-gray-600 dark:text-gray-300 ">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Testimonial:</span>{" "}
                {project.testimonial}
              </p>
              <Button disabled={isLoading} onClick={onStatus} intent={project.published ? "warn" : "accept"}>
                {project.published ? "Unpublish" : "Publish"}
              </Button>
            </div>
          </section>
        </TabsDemo.Content>
      </TabsDemo>
    </>
  );
}
