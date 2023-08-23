"use client";
import { Dropdown } from "@/components/shared/Dropdown";
import { DotsVertical, Trash, Unlink } from "@/lib/icons";

type PropTypes = {
  id: number;
  unlinkImage: (id: number) => Promise<void>;
  deleteImage: (id: number) => Promise<void>;
};

export function ImageDropdown({ id, unlinkImage, deleteImage }: PropTypes) {
  const onDelete = async () => {
    await deleteImage(id);
  };

  const onUnlink = async () => {
    await unlinkImage(id);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Trigger>
          <button className="absolute top-2 right-2 rounded-full flex justify-center items-center h-7 w-7 bg-zinc-800">
            <DotsVertical />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onClick={onUnlink}>
            <Unlink size={16} className="stroke-yellow-600 dark:stroke-yellow-500 inline-block mr-2" />
            Unlink image
          </Dropdown.Item>
          <Dropdown.Item onClick={onDelete}>
            <Trash size={16} className="stroke-yellow-600 dark:stroke-yellow-500 inline-block mr-2" />
            Delete image
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}
