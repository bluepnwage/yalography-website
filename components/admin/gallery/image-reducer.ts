export const initialState = {
  renameDialog: false,
  captionDialog: false
};

type ActionType = keyof typeof initialState;

type Actions = {
  payload: boolean;
  type: ActionType;
};

export function reducer(state: typeof initialState, action: Actions): typeof initialState {
  switch (action.type) {
    case "renameDialog": {
      return { ...state, renameDialog: action.payload };
    }
    case "captionDialog": {
      return { ...state, captionDialog: action.payload };
    }
    default: {
      return state;
    }
  }
}
