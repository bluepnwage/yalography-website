"use client";
import { createContext, useContext } from "react";

type DialogProviderProps = {
  title: string;
  trigger?: React.ReactNode;
  carousel?: boolean;
};

const DialogContext = createContext<DialogProviderProps | null>(null);

export function DialogProvider({ children, ...props }: DialogProviderProps & { children: React.ReactNode }) {
  return <DialogContext.Provider value={props}>{children}</DialogContext.Provider>;
}

export function useDialog() {
  const props = useContext(DialogContext);
  if (!props) throw new Error("Error finding props");
  return props;
}
