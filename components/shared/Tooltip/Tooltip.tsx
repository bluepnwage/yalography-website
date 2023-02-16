"use client";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import styles from "./styles.module.css";

type PropTypes = {
  content: React.ReactNode;
  children: React.ReactNode;
};

export function Tooltip({ content, children }: PropTypes) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={`${styles.TooltipContent} bg-white dark:bg-zinc-800`}
            sideOffset={5}
          >
            {content}
            <RadixTooltip.Arrow className="fill-white dark:fill-zinc-800" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
