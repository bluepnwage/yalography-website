type DialogState = "photo" | "task" | "bookings" | "project" | "command" | "";
type PageState = "projects" | "home" | "bookings" | "tasks";

type State = {
  page: PageState;
  search: string;
  dialog: DialogState;
};

export const initialState: State = {
  page: "home",
  search: "",
  dialog: ""
};
export type Actions =
  | { type: "dialog"; payload: DialogState }
  | { type: "page"; payload: "home" | "projects" | "bookings" | "tasks" }
  | { type: "search"; payload: string };

export function reducer(state: typeof initialState, action: Actions): typeof initialState {
  switch (action.type) {
    case "dialog": {
      return {
        ...state,
        dialog: action.payload,
        search: ""
      };
    }

    case "page": {
      return {
        ...state,
        page: action.payload,
        search: ""
      };
    }
    case "search": {
      return {
        ...state,
        search: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
