"use client";
import { Dialog, TextInput } from "@aomdev/ui";
import { SubmitButton } from "../submit-button";

import type { DialogProps } from "@aomdev/ui";
import { IconX } from "@tabler/icons-react";
import { createProject } from "./action";
import { useCommand } from "./command-provider";

export function ProjectDialog(props: DialogProps) {
  const { dispatch } = useCommand();
  const onSubmit = async (form: FormData) => {
    const { toast } = await import("react-hot-toast");
    const id = toast.loading("Creating project");
    const data = await createProject(form);
    if (data && data.error) return toast.error(data.message);
    dispatch({ type: "dialog", payload: "" });
    toast.success("Project created", { id, duration: 5000 });
  };

  return (
    <>
      <Dialog {...props}>
        <Dialog.Content className="w-1/4" blur={true}>
          <div className="flex justify-between items-center">
            <Dialog.Title>Create new project</Dialog.Title>
            <Dialog.Close>
              <IconX />
            </Dialog.Close>
          </div>
          <form action={onSubmit} className="space-y-4 mt-6">
            <TextInput autoFocus label="Project name" name="project_name" required id="project_name" />
            <SubmitButton className=" ml-auto">Create project</SubmitButton>
          </form>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
