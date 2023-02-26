"use client";
import * as RadixDialog from "@radix-ui/react-dialog";
import styles from "./styles.module.css";
import { XClose } from "@lib/icons";
import { DialogProvider, useDialog } from "./DialogContext";
import { motion, AnimatePresence } from "framer-motion";
import { cx } from "cva";
type ContentProps = {
  portalProps?: RadixDialog.DialogPortalProps;
  overlayProps?: RadixDialog.DialogOverlayProps;
} & RadixDialog.DialogContentProps;

function Trigger({ children, ...props }: RadixDialog.DialogTriggerProps) {
  const { trigger } = useDialog();
  return (
    <RadixDialog.Trigger {...props} asChild>
      {trigger}
    </RadixDialog.Trigger>
  );
}

function Close({ children, ...props }: RadixDialog.DialogCloseProps) {
  const { carousel } = useDialog();
  return (
    <RadixDialog.Close {...props} asChild>
      <button
        aria-label="Close"
        className={cx(
          `absolute hover:bg-zinc-200 dark:hover:bg-zinc-700
         inline-flex items-center justify-center h-10 w-10 rounded-full
          duration-200 ease-out focus:ring-1 ring-black/10`,
          carousel ? "right-0 top-0 z-[9999]" : "right-5 top-5"
        )}
      >
        <XClose fill className={cx(carousel ? "fill-zinc-800 dark:fill-white" : "")} />
      </button>
    </RadixDialog.Close>
  );
}

function Content({ children, portalProps, overlayProps, ...props }: ContentProps) {
  const { title, carousel } = useDialog();
  const id = title.replaceAll(" ", "-").toLowerCase() + "-id";
  return (
    <RadixDialog.Portal {...portalProps}>
      <RadixDialog.Overlay {...overlayProps} asChild className={styles.DialogOverlay}>
        <motion.div
          key={`${id}-overlay`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </RadixDialog.Overlay>
      <div className={styles.DialogContentContainer}>
        <RadixDialog.Content
          data-carousel={carousel}
          asChild
          {...props}
          className={`${styles.DialogContent} relative ${
            !carousel ? "bg-white dark:bg-zinc-800" : "bg-transparent"
          }`}
        >
          <motion.div
            key={`${id}-content`}
            transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
            exit={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -100, opacity: 0 }}
            id={id}
          >
            {!carousel && <Title />}
            {children}
            <Close />
          </motion.div>
        </RadixDialog.Content>
      </div>
    </RadixDialog.Portal>
  );
}

function Title(props: RadixDialog.DialogTitleProps) {
  const { title } = useDialog();
  return (
    <RadixDialog.Title {...props} className="font-bold text-gray-600 dark:text-gray-400 text-xl mb-5">
      {title}
    </RadixDialog.Title>
  );
}

export function Dialog({
  children,
  trigger,
  title,
  carousel,
  ...props
}: RadixDialog.DialogProps & { trigger?: React.ReactNode; title: string; carousel?: boolean }) {
  return (
    <>
      <AnimatePresence>
        {props.open && (
          <RadixDialog.Root {...props}>
            <DialogProvider trigger={trigger} carousel={carousel} title={title}>
              {trigger && <Trigger />}
              <Content>{children}</Content>
            </DialogProvider>
          </RadixDialog.Root>
        )}
      </AnimatePresence>
    </>
  );
}
