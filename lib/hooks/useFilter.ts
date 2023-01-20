import { useReducer } from "react";
import type { FilterOptions, SortOptions } from "@util/filterTasks";

type ReducerState = {
  filter: FilterOptions | null;
  sort: SortOptions | null;
  search: string;
};

export const reducerState: ReducerState = {
  search: "",
  filter: null,
  sort: null
};

type Actions =
  | { type: "filter"; payload: FilterOptions | null }
  | { type: "sort"; payload: SortOptions | null }
  | { type: "search"; payload: string }
  | { type: "clear" };

export function filterReducer(initialState: typeof reducerState, action: Actions): ReducerState {
  switch (action.type) {
    case "filter": {
      return { ...initialState, filter: action.payload };
    }
    case "search": {
      return { ...initialState, search: action.payload };
    }
    case "sort": {
      return { ...initialState, sort: action.payload };
    }
    case "clear": {
      return { filter: null, search: "", sort: null };
    }
    default: {
      throw new Error("Invalid action type");
    }
  }
}

export function useFilter() {
  const [filterOptions, dispatch] = useReducer(filterReducer, reducerState);

  const onSort = (payload: SortOptions | null) => dispatch({ type: "sort", payload });

  const onFilter = (payload: FilterOptions | null) => dispatch({ type: "filter", payload });

  const onSearch = (payload: string) => dispatch({ type: "search", payload });

  const onClear = () => dispatch({ type: "clear" });

  const toggle = {
    onClear,
    onSort,
    onFilter,
    onSearch
  } as const;

  return [filterOptions, toggle] as const;
}
