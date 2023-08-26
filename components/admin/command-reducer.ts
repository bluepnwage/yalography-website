export const initialState = {
  photo: false,
  task: false,
  bookings: false,
  project: false,
  command: false,
  list: false,
  page: "projects"
};
export type Actions =
  | { type: keyof Omit<typeof initialState, "task" | "list">; payload: boolean }
  | { type: "task"; payload: { value: boolean; list: boolean } }
  | { type: "page"; payload: "home" | "projects" | "bookings" | "tasks" };

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
          list: false,
          page: "home"
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
        task: action.payload.value,
        command: false,
        list: action.payload.list
      };
    }
    case "page": {
      return {
        ...state,
        page: action.payload as string
      };
    }

    default: {
      return state;
    }
  }
}
