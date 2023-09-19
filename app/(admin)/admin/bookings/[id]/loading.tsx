import { Skeleton } from "@aomdev/ui";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import Link from "next/link";

export default function LoadingPage() {
  const features = Array(5).fill(null);
  return (
    <>
      <div className="flex gap-5">
        <div className="basis-4/5">
          <div className="border-b border-gray-200 dark:border-gray-700 flex justify-between pb-4">
            <div className="flex text-sm gap-4 items-center text-gray-500 dark:text-gray-200">
              <Link href={"/admin/"}>
                <IconHome size={14} className="dark:text-gray-200 hover:stroke-primary-300" />
              </Link>
              <IconChevronRight size={14} className="dark:text-gray-200" />
              <Link href={"/admin/bookings"} className=" dark:text-gray-200 hover:text-primary-300">
                Bookings
              </Link>
              <IconChevronRight size={14} className="dark:text-gray-200" />
              <Skeleton className="h-3 w-8" rounded animate />
            </div>
          </div>
          <section className=" mt-10">
            <header className="col-span-full ">
              <Skeleton className="h-5 w-48" animate rounded />
              <Skeleton className="mt-4 h-3 w-32" rounded animate />
            </header>
            <div className="my-10">
              <h2 className="mb-6 font-semibold text-gray-900 dark:text-gray-50 text-2xl">
                Contact information
              </h2>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-24" animate rounded />
                <Skeleton className="h-3 w-24" animate rounded />
                <Skeleton className="h-3 w-24" animate rounded />
              </div>
            </div>
            <div className="mb-10">
              <h2 className="mb-6 font-semibold text-gray-900 dark:text-gray-50 text-2xl">Comments</h2>
              <Skeleton className="h-3 w-40" animate rounded />
            </div>
          </section>
        </div>
        <div className="basis-1/5 border-l border-l-gray-200 dark:border-l-gray-700  pt-14 px-4">
          <p className="font-medium text-lg mb-8 text-gray-900 dark:text-gray-50">Details</p>
          <ul className="space-y-4 dark:text-gray-300 mb-8 capitalize">
            <li className="flex justify-between items-center">
              <span className="font-medium dark:text-gray-100">Status</span>{" "}
              <Skeleton className="h-3 w-16" rounded animate />
            </li>
            <li className="flex justify-between items-center">
              <span className="font-medium dark:text-gray-100">Date</span>{" "}
              <Skeleton className="h-3 w-16" rounded animate />
            </li>
            <li className="flex justify-between items-center">
              <span className="font-medium dark:text-gray-100">Time</span>{" "}
              <Skeleton className="h-3 w-16" rounded animate />
            </li>
            <li className="flex justify-between items-center">
              <span className="font-medium dark:text-gray-100">Environment</span>{" "}
              <Skeleton className="h-3 w-16" rounded animate />
            </li>
          </ul>
          <p className="font-medium text-lg mb-4 text-gray-900 dark:text-gray-50">Add-ons</p>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300 mb-8">
            {features.map((_, index) => {
              return (
                <li key={index} className="flex justify-between capitalize">
                  <Skeleton className="h-3 w-20" rounded animate />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
