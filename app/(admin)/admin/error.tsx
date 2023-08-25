"use client";

// 'use client' marks this page as a Client Component
// https://beta.nextjs.org/docs/rendering/server-and-client-components

import { useEffect } from "react";
import { Button } from "@aomdev/ui";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold dark:text-primary-300 text-primary-500">500</p>
        <h1 className="mt-4 text-3xl font-bold font-heading tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          Something went wrong.
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-200">
          The team has already been notified and will look into this problem asap.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={reset}>Refresh page</Button>
          <a href="#" className="text-sm font-semibold dark:text-gray-100 text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
