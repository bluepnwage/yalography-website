export const initialState = {
  reschedule: false,
  delete: false,
  load: false,
  order: false
};

type Actions =
  | {
      type: "reschedule";
      payload: boolean;
    }
  | { type: "delete"; payload: boolean }
  | { type: "load" }
  | { type: "order"; payload: boolean };

type State = typeof initialState;

export function reducer(state: typeof initialState, action: Actions): State {
  switch (action.type) {
    case "reschedule": {
      return {
        ...state,
        reschedule: action.payload
      };
    }
    case "delete": {
      return {
        ...state,
        delete: action.payload
      };
    }
    case "load": {
      return {
        ...state,
        load: true
      };
    }
    case "order": {
      return {
        ...state,
        order: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
