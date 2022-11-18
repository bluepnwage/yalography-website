import type { ReactNode } from "react";

declare global {
  interface ComponentProps {
    children: ReactNode;
  }
}
