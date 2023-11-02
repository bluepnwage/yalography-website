type State = {
  dialog: ActionTypes;
  load: boolean;
};

export const initialState: State = {
  dialog: "",
  load: false
};

type ActionTypes = "reschedule" | "delete" | "order" | "rescheduleApprove" | "";

type Actions =
  | {
      type: "load";
    }
  | { type: "dialog"; payload: ActionTypes };

export function reducer(state: typeof initialState, action: Actions): State {
  switch (action.type) {
    case "load": {
      return {
        ...state,
        load: true
      };
    }
    case "dialog": {
      return {
        ...state,
        dialog: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
