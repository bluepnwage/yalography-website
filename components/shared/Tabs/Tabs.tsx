"use client";
import React, { FormEvent } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "./styles.module.css";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { Select } from "../Select";
import { photoshootTypes } from "@lib/photoshoot";
import { Dropzone } from "@components/admin/projects/Dropzone";
import { useState } from "react";
import type { Projects } from "@prisma/client";

type ProjectData = {
  title: string;
  description: string;
};

function TabsDemo() {
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
    <Tabs.Root className={"flex flex-col ring-1 ring-black/10 rounded-md dark:shadow-none"} defaultValue="information">
      <Tabs.List className="flex border-b border-b-zinc-200 dark:border-b-zinc-700" aria-label="Manage your account">
        <Tabs.Trigger
          className={`bg-white focus:border-2 focus:border-red-600 focus:border-b-0 dark:bg-zinc-800 ${styles.TabsTrigger}`}
          value="information"
        >
          Information
        </Tabs.Trigger>
        <Tabs.Trigger
          className={`bg-white focus:border-2 focus:border-red-600 focus:border-b-0 dark:bg-zinc-800 ${styles.TabsTrigger}`}
          value="customer-details"
        >
          Customer details
        </Tabs.Trigger>
        <Tabs.Trigger
          className={`bg-white focus:border-2 focus:border-red-600 focus:border-b-0 dark:bg-zinc-800 ${styles.TabsTrigger}`}
          value="images"
        >
          Images
        </Tabs.Trigger>
        <Tabs.Trigger
          className={`bg-white focus:border-2 focus:border-red-600 focus:border-b-0 dark:bg-zinc-800 ${styles.TabsTrigger}`}
          value="preview"
        >
          Preview
        </Tabs.Trigger>
        <Tabs.Trigger
          className={`bg-white focus:border-2 focus:border-red-600 focus:border-b-0 dark:bg-zinc-800 ${styles.TabsTrigger}`}
          value="card-preview"
        >
          Card preview
        </Tabs.Trigger>
        <Tabs.Trigger
          className={`bg-white focus:border-2 focus:border-red-600 focus:border-b-0 dark:bg-zinc-800 ${styles.TabsTrigger}`}
          value="publish"
        >
          Publish
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className={`bg-white dark:bg-zinc-800 ring-red-600 dark:ring-red-500/30 focus:ring-1 ${styles.TabsContent}`}
        value="information"
      >
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
      </Tabs.Content>
      <Tabs.Content
        className={`bg-white dark:bg-zinc-800 ring-red-600 dark:ring-red-500/30 focus:ring-1 ${styles.TabsContent}`}
        value="customer-details"
      >
        <p className="Text">Change your password here. After saving, you'll be logged out.</p>
      </Tabs.Content>
      <Tabs.Content
        value="images"
        className={`bg-white dark:bg-zinc-800 ring-red-600 dark:ring-red-500/30 focus:ring-1 ${styles.TabsContent}`}
      >
        <p>Edit something</p>
      </Tabs.Content>
    </Tabs.Root>
  );
}

export { TabsDemo };
