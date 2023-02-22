import { useReducer } from "react";

type ActionType = "change" | "error";
type Fields = "first_name" | "last_name" | "email" | "phone" | "time" | "description";

// type State = Record<Fields, { value: string; error: boolean }>;
type State = Record<Fields, { value: string; error: boolean }> & {
  environment: { value: "inside" | "outside" | ""; error: boolean };
};

type Actions =
  | {
      type: ActionType;
      payload: { value: string; error: boolean };
      key: keyof State;
    }
  | { type: ActionType; payload: "inside" | "outisde"; key: "environment" };

const initialState: State = {
  first_name: { value: "", error: false },
  description: { value: "", error: false },
  email: { value: "", error: false },
  environment: { value: "", error: false },
  last_name: { value: "", error: false },
  phone: { value: "", error: false },
  time: { value: "", error: false }
};

function reducer(state: typeof initialState, action: Actions) {
  switch (action.type) {
    case "change": {
      return { ...state, [action.key]: action.payload };
    }
    case "error": {
      return { ...state, [action.key]: action.payload };
    }
    default: {
      return state;
    }
  }
}

export function useBookingsForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validate = () => {
    let hasError = false;
    Object.entries(state).forEach(([key, value]) => {
      const newKey = key as unknown as Fields | "environment";
      if (!value.value) {
        dispatch({ type: "error", payload: { value: "", error: true }, key: newKey });
        hasError = true;
      }
    });
    return hasError;
  };

  return { state, dispatch, validate };
}
