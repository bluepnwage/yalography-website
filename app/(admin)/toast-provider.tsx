"use client";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  const theme = useTheme();
  return (
    <Toaster
      position="top-right"
      containerStyle={{ zIndex: 10000 }}
      toastOptions={{
        style: {
          backgroundColor: `${theme.resolvedTheme === "dark" ? "#1f1d2f" : "#fff"}`,
          color: `${theme.resolvedTheme === "dark" ? "#d0d9e0" : "#1d262b"}`
        }
      }}
    />
  );
}
