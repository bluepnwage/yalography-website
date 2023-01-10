"use client";
import { Input } from "@components/shared/Input";
import { Select } from "@components/shared/Select";
import { TabsDemo } from "@components/shared/Tabs";
import { Textarea } from "@components/shared/Textarea";
import { photoshootTypes } from "@lib/photoshoot";
import { FormEvent, useState } from "react";
import { Dropzone } from "./Dropzone";

type ProjectData = {
  title: string;
  description: string;
};

export function Editor() {
  const [file, setFile] = useState<File | null>(null);
  const selectData = Array.from(photoshootTypes).map(([key, value]) => ({ label: value.label, value: key }));
  const [data, setData] = useState<Partial<ProjectData>>({});
  const thumbnail = file ? URL.createObjectURL(file) : "";
  const [selectedType, setSelectedType] = useState("");

  const onChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  return (
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
          <Input value={data?.title} onChange={onChange} label="Title" id="title" name="title" required />
          <Textarea
            value={data?.description}
            onChange={onChange}
            label="Description"
            id="description"
            name="description"
          />
          <Select value={selectedType} onValueChange={setSelectedType} label="Photoshoot type" data={selectData} />
          <div className=" mt-5">
            <p>Thumbnail:</p>
            <div className="flex gap-5">
              <Dropzone onDrop={setFile} />
              <div className="bg-zinc-900 basis-2/4 grow">
                <img src={thumbnail} />
              </div>
            </div>
          </div>
        </section>
      </TabsDemo.Content>
      <TabsDemo.Content value="customer-details">
        <p className="Text">Change your password here. After saving, you&apos;ll be logged out.</p>
      </TabsDemo.Content>
      <TabsDemo.Content value="images">
        <p>Edit something</p>
      </TabsDemo.Content>
    </TabsDemo>
  );
}
