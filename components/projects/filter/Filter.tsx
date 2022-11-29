import * as Icon from "./icons";
import styles from "./Filter.module.css";

export function Filter() {
  return (
    <div className="border-b h-16 mb-16 px-16 justify-between gap-5 items-center md:items-items-center md:gap-0 flex-col md:flex-row flex border-zinc-200 dark:border-zinc-700">
      <div className="flex gap-5 items-center">
        <div className="flex gap-2">
          <Icon.FilterIcon />
          <p className="font-bold">Filter</p>
        </div>
        <hr className="border border-zinc-700 h-5" />
        <button>Clear all</button>
      </div>
      <p className="flex gap-2 items-center relative">
        <label htmlFor="search">Search</label>
        <input
          type={"search"}
          id="search"
          className={`${styles.input} relative appearance-none px-4 py-1 outline-none rounded-sm bg-zinc-100 border-gray-200 dark:bg-zinc-700 border dark:border-gray-700 focus:border-red-500 duration-200 ease-out`}
        />
      </p>
    </div>
  );
}
