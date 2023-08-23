export const initialState = {
  photo: false,
  task: false,
  bookings: false,
  project: false,
  command: false
};
type Actions = { type: keyof typeof initialState; payload: boolean };

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
          task: false
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

    default: {
      return state;
    }
  }
}
