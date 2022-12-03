"use client";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import scrollAreaStyles from "./styles.module.css";
import { cva } from "cva";

const scrollbarStyles = cva("flex bg-zinc-700 relative select-none grow touch-none", {
  variants: {
    orientation: {
      vertical: "data-[orientation=vertical]:w-[5px]",
      horizontal: "flex-col data-[orientation=horizontal]:h-[5px]"
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

type ScrollBarOrientation = "vertical" | "horizontal";

type PropTypes = {
  children: React.ReactNode;
  height: string | number;
  orientation: ScrollBarOrientation;
  className?: string;
};

export function ScrollAreaDemo({ children, height, orientation, className }: PropTypes) {
  return (
    <ScrollArea.Root style={{ height }} className={`w-full overflow-hidden`}>
      <ScrollArea.Viewport className={`w-full h-full p-4 ${className}`}>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={scrollbarStyles({ orientation })} orientation={orientation}>
        <ScrollArea.Thumb className={`bg-zinc-600 w-2 grow relative rounded-md ${scrollAreaStyles.ScrollAreaThumb}`} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={scrollAreaStyles.ScrollAreaCorner} />
    </ScrollArea.Root>
  );
}
