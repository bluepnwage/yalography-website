"use client";

import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function NextThemesProvider(props: ThemeProviderProps) {
  return <ThemeProvider {...props} />;
}
