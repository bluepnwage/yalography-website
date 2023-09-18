"use client";
import { useReducer, useContext, createContext, Dispatch } from "react";
import { reducer, initialState } from "./command-reducer";
import type { Actions } from "./command-reducer";
import { useRouter } from "next/navigation";

type AdminProviderProps = {
  state: typeof initialState;
  dispatch: Dispatch<Actions>;
  onSelect: (value: string) => void;
};

const AdminContext = createContext<AdminProviderProps | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const onSelect = (value: string) => {
    router.push(`/admin/${value}`);
    dispatch({ type: "dialog", payload: "" });
  };

  return <AdminContext.Provider value={{ state, dispatch, onSelect }}>{children}</AdminContext.Provider>;
}

export function useCommand() {
  const values = useContext(AdminContext);
  if (!values) throw new Error("Context must be used within provider");
  return values;
}
