import { PopularMonths, PopularMonthsLoading } from "./PopularMonths";
import { Suspense } from "react";

export function PopularMonthsSuspense() {
  return (
    <>
      <Suspense fallback={<PopularMonthsLoading />}>
        <PopularMonths />
      </Suspense>
    </>
  );
}
