import { HTMLAttributes } from "react";

export function ThemeIcon({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`bg-gradient-to-tr flex justify-center items-center from-rose-500 to-red-600 rounded-full h-12 w-12 ${className}`}
    >
      {children}
    </div>
  );
}
