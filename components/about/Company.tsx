type PropTypes = {
  companyName: string;
};
export function Company({ companyName }: PropTypes) {
  return (
    <div className="bg-gray-200 lg:col-span-1 col-span-full dark:bg-zinc-600 bg-opacity-40 dark:bg-opacity-40 py-7">
      <p className="font-semibold text-slate-500 font-heading  dark:text-slate-100 text-2xl text-center ">
        {companyName}
      </p>
    </div>
  );
}
