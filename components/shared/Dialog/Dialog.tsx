"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./styles.module.css";
import { XClose } from "@lib/icons";

export function Trigger({ children, ...props }: Dialog.DialogTriggerProps) {
  return (
    <Dialog.Trigger {...props} asChild>
      {children}
    </Dialog.Trigger>
  );
}

function Close({ children, ...props }: Dialog.DialogCloseProps) {
  return (
    <Dialog.Close {...props} asChild>
      <button
        aria-label="Close"
        className="absolute right-5 top-5 hover:bg-zinc-200 dark:hover:bg-zinc-700 inline-flex items-center justify-center h-10 w-10 rounded-full duration-200 ease-out focus:ring-1 ring-black/10"
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
      <Dialog.Content className={`${styles.DialogContent} bg-white dark:bg-zinc-800`}>{children}</Dialog.Content>
    </Dialog.Portal>
  );
}

export function Title(props: Dialog.DialogTitleProps) {
  return (
    <Dialog.Title {...props} className="font-bold text-gray-600 dark:text-gray-400 text-xl mb-5">
      {props.children}
    </Dialog.Title>
  );
}

export function DialogDemo({
  children,
  trigger,
  title,
  ...props
}: Dialog.DialogProps & { trigger?: React.ReactNode; title?: string }) {
  return (
    <Dialog.Root {...props}>
      {trigger && <Trigger>{trigger}</Trigger>}
      <Content>
        <Title>{title}</Title>
        {children}
        <Close />
      </Content>
    </Dialog.Root>
  );
}
