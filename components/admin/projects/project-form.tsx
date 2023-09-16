"use client";
import { Button, TextInput, Textarea, Title, Dropdown, Select, Card, Badge, ActionIcon } from "@aomdev/ui";
import { IconPlus, IconX } from "@tabler/icons-react";
import { photoshootTypes } from "@/lib/photoshoot";
import type { SelectProps } from "@aomdev/ui";
import { FormEvent, useRef, useState, useTransition } from "react";
import { NewImageDialog } from "./new-image-dialog";
import { CustomDropzone } from "../custom-dropzone";
import { ExistingImageDialog } from "./existing-image-dialog";
import type { Images } from "@prisma/client";
import type { ProjectData } from "@/app/(admin)/admin/projects/[id]/page";
import { useRouteRefresh } from "@/lib/hooks/useRouteRefresh";
import { useToggle } from "@/lib/hooks/useToggle";

type PropTypes = {
  galleryImages: Images[];
  project: ProjectData;
};

export function ProjectForm({ galleryImages, project }: PropTypes) {
  const [images, setImages] = useState<File[]>([]);
  const items: SelectProps["items"] = [];
  const [uploadedImages, setUploadedImages] = useState(project.images);
  const [thumbnail, setThumbnail] = useState<File>();
  const [imageDialog, setImageDialog] = useState<"new" | "existing" | "">("");
  const [shootType, setShootType] = useState(project.type);
  const timerId = useRef<NodeJS.Timer>();
  const [isPending, refresh] = useRouteRefresh();
  const [isLoading, toggle] = useToggle();
  const edited = useRef(false);
  const [, startTransition] = useTransition();

  for (const [key, value] of photoshootTypes) {
    items.push({ label: value.label, value: key });
  }

  const thumbnailURL = thumbnail
    ? URL.createObjectURL(thumbnail)
    : project.thumbnail
    ? project.thumbnail
    : "";

  const onImageDelete = async (id: number) => {
    const previous = uploadedImages;
    setUploadedImages(prev => prev.filter(image => image.id !== id));
    const error = await unlinkImage(id);
    if (error) setUploadedImages(previous);
  };

  const onAddExistingImages = (images: Images[]) => {
    setUploadedImages(images);
    edited.current = true;
  };

  const unlinkImage = async (id: number) => {
    const { toast } = await import("react-toastify");

    try {
      const res = await fetch("/api/images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, projectId: null })
      });
      if (res.ok) {
      } else {
        throw new Error("Failed to unlink image");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      return true;
    } finally {
      edited.current = true;
    }
  };

  const onImageAdd = (files: File[]) => {
    if (files) {
      edited.current = true;
      setImages(files);
    }
  };

  const onFileDelete = (file: File) => {
    setImages(images => images.filter(image => image.name !== file.name));
  };

  const onChange = (file: FileList | null) => {
    if (file) {
      setThumbnail(file[0]);
      edited.current = true;
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    e.preventDefault();
    edited.current = true;
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = undefined;
    }

    await onSave(
      {
        title: formData.project_title.toString() || "",
        companyName: formData.company_name.toString(),
        customerName: formData.customer_name.toString() || "",
        description: formData.description.toString(),
        testimonial: formData.testimonial.toString()
      },
      true
    );
  };

  const onSave = async (
    data: {
      title: string;
      testimonial: string;
      companyName: string;
      customerName: string;
      description: string;
    },
    refreshRoot?: boolean
  ) => {
    let url = project.thumbnail;
    let json: any;
    toggle.on();
    const { toast } = await import("react-hot-toast");
    const id = toast.loading("Saving project...");
    let hasThumbnail = true;

    try {
      //if theres no previous thumbnail  uploaded already
      //or
      //if theres already a previous thumbnail but the user wants to change the thumbnail
      //then upload a new thumbnail
      if ((!url && thumbnail) || (url !== thumbnailURL && thumbnail)) {
        const { uploadThumbnail } = await import("@/lib/upload-image");
        json = await uploadThumbnail(thumbnail);
        hasThumbnail = false;
      }

      if (images.length > 0) {
        const { uploadToCloudinary } = await import("@/lib/upload-image");
        const promise = images.map(image => uploadToCloudinary(image, { projectId: project.id }));
        await Promise.all(promise);
      }

      const jsonData = {
        ...data,
        id: project.id,
        type: shootType,
        thumbnail: url
      };

      const jsonData2 = {
        ...jsonData,
        thumbnail: json.url,
        thumbnailPublicId: json.public_id,
        thumbnailType: json.format
      };

      //Update the ids of the selected images to match the id of the project
      if (uploadedImages.length > 0) {
        const ids = uploadedImages.map(image => image.id);
        const imagesEndpoint = new URL("/api/images", location.origin);
        imagesEndpoint.searchParams.set("multiple", "1");
        const res = await fetch(imagesEndpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids, projectId: project.id })
        });
        if (!res.ok) {
          throw new Error("Failed to link selected images to project.");
        }
      }

      const endpoint = new URL("/api/projects", location.origin);

      if (refreshRoot) {
        endpoint.searchParams.set("revalidate", project.published ? "1" : "0");
      } else {
        endpoint.searchParams.set("revalidate", "0");
      }

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(!hasThumbnail ? jsonData2 : jsonData)
      });
      if (res.ok) {
        if (refreshRoot) {
          startTransition(() => {
            refresh();
            setImages([]);
          });
        }

        toast.success("Project saved", { id });
      } else {
        throw new Error("Failed to save project");
      }
    } catch (error) {
      toast.dismiss(id);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error ocurred while saving the project.");
      }
    } finally {
      toggle.off();
      edited.current = false;
    }
  };

  return (
    <>
      <ExistingImageDialog
        projectId={project.id}
        onAddExistingImages={onAddExistingImages}
        images={galleryImages}
        open={imageDialog === "existing"}
        onOpenChange={val => setImageDialog(val ? "existing" : "")}
      />
      <NewImageDialog
        onImageAdd={onImageAdd}
        open={imageDialog === "new"}
        onOpenChange={val => setImageDialog(val ? "new" : "")}
      />
      <form onSubmit={onSubmit} className="space w-2/4 mx-auto space-y-10">
        <section className="space-y-4">
          <Title order={2} className="mb-2 font-semibold text-2xl">
            Project information
          </Title>
          <TextInput
            label="Title"
            defaultValue={project.title || ""}
            name="project_title"
            id="project_title"
          />
          <Textarea
            label="Description"
            name="description"
            rows={5}
            defaultValue={project.description || ""}
          />
          <div className="space-y-2">
            <span className="text-gray-100 text-sm">Shoot type</span>
            <Select value={shootType || undefined} onValueChange={setShootType} items={items} fullWidth />
          </div>
          <div className="space-y-2">
            <span className="text-gray-100 text-sm">Thumbnail</span>
            <CustomDropzone onAccept={onChange} className="h-64 w-full " />

            <div className=" grid grid-cols-3">
              <img src={thumbnailURL} />
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <Title order={2} className="mb-2 font-semibold text-2xl">
            Customer details
          </Title>
          <TextInput label="Customer name" name="customer_name" defaultValue={project.customerName || ""} />
          <TextInput label="Customer company" name="company_name" defaultValue={project.companyName || ""} />
          <Textarea label="Testimonial" name="testimonial" defaultValue={project.testimonial || ""} />
        </section>
        <section className="space-y-4">
          <Title order={2} className="mb-2 font-semibold text-2xl">
            Images
          </Title>
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button>
                <IconPlus size={16} className="inline-block mr-2" />
                Add images
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item onClick={() => setImageDialog("existing")}>Add existing image</Dropdown.Item>
              <Dropdown.Item onClick={() => setImageDialog("new")}>Add new image</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          {uploadedImages.map(image => {
            return (
              <Card key={image.id} className="flex justify-between">
                <span>{image.name}</span>
                <div className="gap-2 flex items-center">
                  <Badge variant={"status"} color={"success"}>
                    Published
                  </Badge>
                  <ActionIcon type="button" aria-label="Delete image" onClick={() => onImageDelete(image.id)}>
                    <IconX size={"75%"} />
                  </ActionIcon>
                </div>
              </Card>
            );
          })}
          {images.map(image => {
            return (
              <Card key={image.name} className="flex justify-between">
                <span>{image.name}</span>
                <div className="gap-2 flex items-center">
                  <Badge variant={"status"} color={"warn"}>
                    Drafted
                  </Badge>
                  <ActionIcon type="button" onClick={() => onFileDelete(image)} aria-label="Delete image">
                    <IconX size={"75%"} />
                  </ActionIcon>
                </div>
              </Card>
            );
          })}
        </section>
        <Button fullWidth disabled={isPending || isLoading}>
          Save
        </Button>
      </form>
    </>
  );
}
