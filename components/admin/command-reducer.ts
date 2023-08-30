export const initialState = {
  photo: false,
  task: false,
  bookings: false,
  project: false,
  command: false,
  page: "projects",
  search: ""
};
export type Actions =
  | { type: keyof Omit<typeof initialState, "search" | "page">; payload: boolean }
  | { type: "page"; payload: "home" | "projects" | "bookings" | "tasks" }
  | { type: "search"; payload: string };

export function reducer(state: typeof initialState, action: Actions): typeof initialState {
  switch (action.type) {
    case "bookings": {
      return {
        ...state,
        bookings: action.payload,
        command: false
      };
    }

    case "command": {
      if (action.payload) {
        return {
          bookings: false,
          command: action.payload,
          photo: false,
          project: false,
          task: false,
          page: "home",
          search: ""
        };
      }
      return {
        ...state,
        command: action.payload
      };
    }
    case "photo": {
      return {
        ...state,
        photo: action.payload,
        command: false
      };
    }
    case "project": {
      return {
        ...state,
        project: action.payload,
        command: false
      };
    }
    case "task": {
      return {
        ...state,
        task: action.payload,
        command: false
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
