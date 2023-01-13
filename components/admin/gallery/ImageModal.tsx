"use client";
import { Dialog } from "@components/shared/Dialog";

type PropTypes = { opened: boolean; onValueChange: (value: boolean) => void };

export function ImageModal({ opened, onValueChange }: PropTypes) {
  return (
    <Dialog open={opened} onOpenChange={onValueChange} title="Rename image">
      <p>Hello there</p>
    </Dialog>
  );
}
