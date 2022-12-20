"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./styles.module.css";
import { XClose } from "@lib/icons";

export function Trigger({ children, ...props }: Dialog.DialogTriggerProps) {
  return (
    <Dialog.Trigger {...props} asChild>
      <button className="inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold">{children}</button>
    </Dialog.Trigger>
  );
}

function Close({ children, ...props }: Dialog.DialogCloseProps) {
  return (
    <Dialog.Close {...props} asChild>
      <button
        aria-label="Close"
        className="hover:bg-zinc-700 h-20 w-10 rounded-full duration-200 ease-out focus:ring-1 ring-black/10"
      >
        <XClose fill />
      </button>
    </Dialog.Close>
  );
}

function Content({ children }: Dialog.DialogContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.DialogOverlay} />
      <Dialog.Content className={styles.DialogContent}>{children}</Dialog.Content>
    </Dialog.Portal>
  );
}

export function DialogDemo({ children, ...props }: Dialog.DialogProps) {
  return (
    <Dialog.Root {...props}>
      <Trigger>Open modal</Trigger>
      <Content>
        {children}
        <Close />
      </Content>
    </Dialog.Root>
  );
}
