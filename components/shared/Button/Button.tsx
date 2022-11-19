import type { ButtonHTMLAttributes } from "react";

interface PropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "secondary";
  width?: "full" | "fit";
}

export function Button({ intent, children, width, className, ...buttonProps }: PropTypes) {
  return (
    <button
      {...buttonProps}
      className={`px-4 py-2 bg-red-600 text-gray-100 font-semibold rounded-md ${className} ${
        width === "full" ? "w-full" : "w-fit"
      }`}
    >
      {children}
    </button>
  );
}
