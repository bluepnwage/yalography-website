"use client";
import { Select } from "@/components/shared/Select";
import { Input } from "@/components/shared/Input";
import { FilterOptions, SortOptions } from "@/util/filterTasks";

type PropTypes = {
  onSortChange: (value: SortOptions | null) => void;
  onFilterChange: (value: FilterOptions | null) => void;
  onClear: () => void;
  sortValue: SortOptions | null;
  filterValue: FilterOptions | null;
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export function FilterBar({
  onSortChange,
  onFilterChange,
  onClear,
  sortValue,
  filterValue,
  onSearchChange,
  searchValue
}: PropTypes) {
  return (
    <>
      <div className="bg-white ring-1 ring-black ring-opacity-10 dark:bg-zinc-800 rounded-md p-4 flex gap-4 items-end">
        <div className="basis-1/4 grow">
          <Select
            label=""
            triggerHeight="h-8"
            value={sortValue || ""}
            onValueChange={(value: SortOptions) => onSortChange(value)}
            data={[
              { label: "Ascending", value: "asc" },
              { label: "Descending", value: "desc" },
              { label: "Recently created", value: "recent" },
              { label: "Oldest", value: "old" }
            ]}
          />
        </div>
        <div className="basis-1/4 grow">
          <Select
            label=""
            triggerHeight="h-8"
            value={filterValue || ""}
            onValueChange={(value: FilterOptions) => onFilterChange(value)}
            data={[
              { label: "Completed", value: "completed" },
              { label: "In progress", value: "in-progress" },
              { label: "High priority", value: "high" },
              { label: "Medium priority", value: "medium" },
              { label: "Low priority", value: "low" }
            ]}
            className="h-fit"
          />
        </div>
        <div className="basis-1/4 grow">
          <Input
            onChange={e => onSearchChange(e.currentTarget.value)}
            value={searchValue}
            placeholder="Search"
            label=""
            type={"search"}
            className="h-8"
          />
        </div>
        <button onClick={onClear}>Clear</button>
      </div>
    </>
  );
}
