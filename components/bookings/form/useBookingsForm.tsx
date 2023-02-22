import { Dispatch, useReducer } from "react";

type ActionType = "change" | "error";
type Fields = "first_name" | "last_name" | "email" | "phone";
type Payload<T> = { value: T; error: boolean };

function createObj<T extends {}, U>(state: T, dispatch: Dispatch<Actions<U>>) {
  return { state, dispatch };
}

type State = Record<Fields, Payload<string>>;

type Actions<T> = {
  type: ActionType;
  payload: Payload<T>;
  key: string;
};

const initialState: State = {
  first_name: { value: "", error: false },
  email: { value: "", error: false },
  last_name: { value: "", error: false },
  phone: { value: "", error: false }
};

function reducer(state: typeof initialState, action: Actions<string>) {
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

type DetailsState = {
  environment: Payload<"inside" | "outside" | "">;
  date: Payload<Date | null>;
  shootType: Payload<string>;
  time: Payload<string>;
  description: Payload<string>;
};

const initialDetails: Partial<DetailsState> = {
  date: { value: null, error: false },
  environment: { value: "", error: false },
  shootType: { value: "", error: false },
  time: { value: "", error: false }
};

function detailsReducer(
  state: typeof initialDetails,
  action: Actions<string | Date | "inside" | "outside" | null>
) {
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
export function useForm() {
  const [detailsState, detailsDispatch] = useReducer(detailsReducer, initialDetails);
  const [contactState, contactDispatch] = useReducer(reducer, initialState);

  const validate = (stateKey: "contact" | "details") => {
    let hasError = false;

    if (stateKey === "contact") {
      Object.entries(contactState).forEach(([key, value]) => {
        const newKey = key as unknown as Fields;
        if (!value.value) {
          console.log(key, value);
          contactDispatch({ type: "error", payload: { value: "", error: true }, key: newKey });
          hasError = true;
        }
      });
    } else if (stateKey === "details") {
      console.log("something is wrong");
      Object.entries(detailsState).forEach(([key, value]) => {
        const newKey = key;
        if (!value.value && newKey !== "description") {
          detailsDispatch({ type: "error", payload: { value: "", error: true }, key: newKey });
          hasError = true;
        }
      });
    } else {
      return hasError;
    }
    return hasError;
  };

  const contact = createObj(contactState, contactDispatch);
  const details = createObj(detailsState, detailsDispatch);

  return { contact, details, validate };
}
