type PropTypes = {
  type: "Task list" | "Project" | "Folder" | "Booking" | "Page";
};
export function AdminNotFound({ type }: PropTypes) {
  return (
    <>
      <section className="grid min-h-full place-items-center  py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-red-600 dark:text-red-500">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">
            {type} not found
          </h1>
        </div>
      </section>
    </>
  );
}
