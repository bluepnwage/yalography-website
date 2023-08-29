"use client";
import { FilterOptions, SortOptions } from "@/util/filterTasks";
import { Select, TextInput } from "@aomdev/ui";
import { IconSearch } from "@tabler/icons-react";
import { Button } from "@aomdev/ui";

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
      <div className="flex gap-4 items-end">
        <div className="">
          <TextInput
            icon={<IconSearch size={16} />}
            onChange={e => onSearchChange(e.currentTarget.value)}
            value={searchValue}
            placeholder="Search"
            label=""
            type={"search"}
            className="h-8"
          />
        </div>
        <div className="">
          <Select
            placeholder="Sort by..."
            fullWidth
            value={sortValue || ""}
            onValueChange={(value: SortOptions) => onSortChange(value)}
            items={[
              { label: "Ascending", value: "asc" },
              { label: "Descending", value: "desc" },
              { label: "Recently created", value: "recent" },
              { label: "Oldest", value: "old" }
            ]}
          />
        </div>
        <div className="">
          <Select
            placeholder="Filter by..."
            fullWidth
            value={filterValue || ""}
            onValueChange={(value: FilterOptions) => onFilterChange(value)}
            items={[
              { label: "Completed", value: "completed" },
              { label: "In progress", value: "in-progress" },
              { label: "High priority", value: "high" },
              { label: "Medium priority", value: "medium" },
              { label: "Low priority", value: "low" }
            ]}
          />
        </div>

        <Button variant={"outline"} onClick={onClear}>
          Clear
        </Button>
      </div>
    </>
  );
}
