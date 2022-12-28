import { WelcomeStats, WelcomeStatsLoading } from "./WelcomeStats";
import { Suspense } from "react";

export function Welcome() {
  return (
    <>
      <Suspense fallback={<WelcomeStatsLoading />}>
        <WelcomeStats />
      </Suspense>
    </>
  );
}
