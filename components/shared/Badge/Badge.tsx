import type { ReactNode } from "react";

interface PropTypes {
  color: "red" | "green" | "indigo" | "yellow" | "orange";
  children: ReactNode;
}

export function Badge({ children }: PropTypes) {
  return (
    <div className="rounded-xl px-4 py-2 bg-indigo-600 bg-opacity-50 text-indigo-300 font-semibold">
      <span>{children}</span>
    </div>
  );
}
