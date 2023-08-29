"use client";
import { Dialog, Button, DialogProps, ScrollArea } from "@aomdev/ui";
import { Images } from "@prisma/client";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

type PropTypes = {
  images: Images[];
  onAddExistingImages: (images: Images[]) => void;
  projectId: number;
} & DialogProps;

export function ExistingImageDialog({ images, onAddExistingImages, projectId, ...props }: PropTypes) {
  const [selected, setSelected] = useState(new Map<number, Images>());

  const onSelect = (image: Images, isSelected: boolean) => {
    const newState = new Map(selected);
    if (isSelected) {
      newState.delete(image.id);
      setSelected(newState);
    } else {
      newState.set(image.id, image);
      setSelected(newState);
    }
  };

  const selectCount = selected.size;

  const onClick = () => {
    const images = [];
    for (const [, image] of selected) {
      images.push(image);
    }
    onAddExistingImages(images);
    if (props.onOpenChange) props.onOpenChange(false);
  };

  return (
    <Dialog {...props}>
      <Dialog.Content className="w-2/4">
        <ScrollArea style={{ height: 500 }} className="-mx-4 px-4">
          <div className="flex justify-between mb-6">
            <Dialog.Title>Add existing images</Dialog.Title>
            <Dialog.Close>
              <IconX size={"75%"} />
            </Dialog.Close>
          </div>
          <div style={{ gridRow: "repeat(auto, 1fr)" }} className="grid grid-cols-3  gap-4 mt-4 px-1">
            {images.map(image => {
              const isSelected = selected.has(image.id) || image.projectId === projectId;
              return (
                <figure
                  key={image.id}
                  data-selected={isSelected}
                  className="group cursor-pointer duration-200 ease-out aspect-square overflow-hidden  data-[selected=true]:ring-2 ring-success-600"
                >
                  <img
                    className="group-hover:opacity-70 group-data-[selected=true]:opacity-70 duration-200 ease-out object-cover h-full w-full"
                    onClick={() => onSelect(image, isSelected)}
                    src={image.url}
                  />
                </figure>
              );
            })}
          </div>
        </ScrollArea>
        <div className="flex mt-4 justify-between border-t border-neutral-700 pt-4 items-center">
          <p>{selectCount} images selected</p>
          <Button onClick={onClick} className="">
            Upload
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
