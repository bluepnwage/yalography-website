"use client";
import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "bg-white dark:bg-neutral-900 p-4 w-[356px] flex gap-[6px] items-center ring-1 ring-neutral-100 dark:ring-neutral-800 rounded",
          success: "text-success-600 dark:text-success-500",
          title: "text-gray-800 dark:text-gray-100",
          description: "text-gray-700 dark:text-gray-200",
          error: "text-error-600 dark:text-error-500"
        }
      }}
    />
  );
}
