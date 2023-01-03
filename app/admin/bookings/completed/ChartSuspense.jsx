import { ChartContainer, ChartLoading } from "./ChartContainer";
import { Suspense } from "react";

export function ChartSuspense() {
  return (
    <>
      <Suspense fallback={<ChartLoading />}>
         <ChartContainer />
      </Suspense>
    </>
  );
}
