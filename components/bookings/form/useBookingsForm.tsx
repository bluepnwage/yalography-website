import { Dispatch, useReducer } from "react";

type ActionType = "change" | "error";
type Fields = "first_name" | "last_name" | "email" | "phone";
type Payload<T> = { value: T; error: boolean };

function createObj<T extends {}, U>(state: T, dispatch: Dispatch<Actions<U>>) {
  return { state, dispatch };
}

type State = Record<Fields, Partial<Payload<string>>>;

type Actions<T> =
  | {
      type: ActionType;
      payload: Payload<T>;
      key: string;
    }
  | { type: "reset" };

const initialContact: State = {
  first_name: {},
  email: {},
  last_name: {},
  phone: {}
};

function reducer(state: typeof initialContact, action: Actions<string>): typeof initialContact {
  switch (action.type) {
    case "change": {
      return { ...state, [action.key]: action.payload };
    }
    case "error": {
      return { ...state, [action.key]: action.payload };
    }
    case "reset": {
      return { email: {}, first_name: {}, last_name: {}, phone: {} };
    }
    default: {
      return state;
    }
  }
}

type DetailsState = {
  environment: Partial<Payload<"inside" | "outside" | "">>;
  date: Partial<Payload<Date | undefined>>;
  shootType: Partial<Payload<string>>;
  time: Partial<Payload<string>>;
  description: Partial<Payload<string>>;
};

const initialDetails: Partial<DetailsState> = {
  date: {},
  environment: {},
  shootType: {},
  time: {}
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
  const [contactState, contactDispatch] = useReducer(reducer, initialContact);

  const validate = (stateKey: "contact" | "details") => {
    let hasError = false;

    if (stateKey === "contact") {
      Object.entries(contactState).forEach(([key, value]) => {
        const newKey = key as unknown as Fields;
        if (!value.value) {
          contactDispatch({ type: "error", payload: { value: "", error: true }, key: newKey });
          hasError = true;
        }
      });
    } else if (stateKey === "details") {
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
