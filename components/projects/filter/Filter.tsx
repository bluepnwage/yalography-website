import * as Icon from "./icons";
import styles from "./Filter.module.css";

export function Filter() {
  return (
    <div className="border-b py-5 mb-16 px-16 justify-between gap-5 items-center lg:items-start lg:gap-0 flex-col lg:flex-row flex border-zinc-700">
      <div className="flex gap-5 items-center">
        <div className="flex gap-2">
          <Icon.FilterIcon />
          <p className="font-bold">Filter</p>
        </div>
        <hr className="border border-zinc-700 h-5" />
        <button>Clear all</button>
      </div>
      <p className="space-y-2 lg:space-y-0 lg:space-x-4 relative">
        <label htmlFor="search">Search</label>
        <input
          type={"search"}
          id="search"
          className={`${styles.input} relative appearance-none px-4 py-1 outline-none rounded-sm bg-zinc-700 border border-gray-700 focus:border-red-500 duration-200 ease-out`}
        />
      </p>
    </div>
  );
}
