"use client";
import { Input } from "@components/shared/Input";
import { Select } from "@components/shared/Select";
import { TabsDemo } from "@components/shared/Tabs";
import { Textarea } from "@components/shared/Textarea";
import { photoshootTypes } from "@lib/photoshoot";
import { FormEvent, useState } from "react";
import { Dropzone } from "./Dropzone";
import { Badge } from "@components/shared/Badge";
import { Button } from "@components/shared/Button";
import { toast } from "react-toastify";

type ProjectData = {
  title: string;
  description: string;
  customer_name: string;
  company_name: string;
  testimonial: string;
};

type PropTypes = {};

export function Editor() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[] | null>(null);
  const selectData = Array.from(photoshootTypes).map(([key, value]) => ({ label: value.label, value: key }));
  const [project, setProject] = useState<Partial<ProjectData>>({});

  const thumbnailURL = thumbnail ? URL.createObjectURL(thumbnail) : "";
  const [selectedType, setSelectedType] = useState("");

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
    const res = await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: false, id: 1 })
    });
    if (res.ok) {
      toast.success("Project drafted");
    }
  };

  const onSave = async () => {
    const jsonData = {
      id: 1,
      title: project.title || "",
      testimonial: project.testimonial || "",
      companyName: project.company_name || "",
      customerName: project.customer_name || ""
      //   thumbnail: url ? url : ""
    };
    const res = await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData)
    });
    if (res.ok) {
      toast.success("Projects saved");
    }
  };

  return (
    <>
      <Button onClick={onSave} className="mb-4 block" intent={"accept"}>
        Save changes
      </Button>
      <TabsDemo defaultValue="information">
        <TabsDemo.List>
          <TabsDemo.Trigger value="information">Information</TabsDemo.Trigger>
          <TabsDemo.Trigger value="customer-details">Customer details</TabsDemo.Trigger>
          <TabsDemo.Trigger value="images">Images</TabsDemo.Trigger>
          <TabsDemo.Trigger value="preview">Preview</TabsDemo.Trigger>
          <TabsDemo.Trigger value="card-preview">Card preview</TabsDemo.Trigger>
          <TabsDemo.Trigger value="publish">Publish</TabsDemo.Trigger>
        </TabsDemo.List>
        <TabsDemo.Content value="information">
          <section className="space-y-5">
            <Input value={project?.title} onChange={onChange} label="Title" id="title" name="title" required />
            <Textarea
              value={project?.description}
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
                <div className="bg-zinc-900 basis-2/4 grow">
                  <img src={thumbnailURL} />
                </div>
              </div>
            </div>
          </section>
        </TabsDemo.Content>
        <TabsDemo.Content value="customer-details">
          <section className="space-y-5">
            <Input
              value={project.customer_name}
              onChange={onChange}
              label="Customer name"
              name="customer_name"
              id="customer_name"
            />
            <Input
              value={project.company_name}
              onChange={onChange}
              label="Company name"
              name="company_name"
              id="company_name"
            />
            <Textarea
              value={project.testimonial}
              onChange={onChange}
              label="Customer testimonial"
              name="testimonial"
              id="testimonial"
            />
          </section>
        </TabsDemo.Content>
        <TabsDemo.Content value="images">
          <p>Edit something</p>
          <Dropzone multiple onDrop={onImagesDrop} />
        </TabsDemo.Content>
        <TabsDemo.Content value="preview">
          <div>
            <img src={thumbnailURL} className="w-full h-64 mb-10 object-cover" />
          </div>

          <section className="grid grid-cols-2 gap-4 mb-10">
            <div>
              <h3 className="text-gray-900 text-4xl font-bold mb-2 dark:text-gray-100">Overview</h3>
              <p className="">{project.description}</p>
            </div>
            <div className="bg-white rounded-md dark:bg-zinc-800 p-2">
              <p className="text-red-600 dark:text-red-500 text-center mb-2">Testimonial</p>
              <p className="mb-4">{project.testimonial}</p>
              <strong className="block mb-4">{project.customer_name}</strong>
              <p className="text-red-600 dark:text-red-500">{project.company_name}</p>
            </div>
          </section>
          <section>
            <header className="text-center">
              <h2 className="dark:text-red-500 text-red-600">Gallery</h2>
              <h3 className="dark:text-gray-100 text-2xl font-bold mb-5 :text-gray-900">
                See the images that brought this project to life
              </h3>
            </header>
            <div className="flex gap-4">
              {images?.map((image, key) => {
                const url = URL.createObjectURL(image);
                return (
                  <div key={key} className="basis-1/3 grow">
                    <img src={url} className="h-full w-full" />
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
              <div className="flex justify-between">
                <p className="font-bold text-2xl">{project.title}</p>
                <Badge color={"violet"} className="capitalize ">
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
              <Badge color="emerald" className="w-fit inline-block mx-auto">
                Published
              </Badge>
              <hr className="h-1 border-zinc-200 dark:border-zinc-700 w-full " />
              <p className="text-gray-600 dark:text-gray-300 ">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Description:</span>{" "}
                {project.description}
              </p>
              <p className="text-gray-600 dark:text-gray-300 ">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Customer name:</span>{" "}
                {project.customer_name}
              </p>
              <p className="text-gray-600 dark:text-gray-300 ">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Company name:</span>{" "}
                {project.company_name}
              </p>
              <p className="text-gray-600 dark:text-gray-300 ">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Testimonial:</span>{" "}
                {project.testimonial}
              </p>
              <Button onClick={onStatus} intent={"warn"}>
                Unpublish project
              </Button>
            </div>
          </section>
        </TabsDemo.Content>
      </TabsDemo>
    </>
  );
}
