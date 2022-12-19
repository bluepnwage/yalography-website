import { WelcomeStats, WelcomeStatsLoading } from "./WelcomeStats";
import { Suspense } from "react";

export function Welcome() {
  return (
    <>
      <WelcomeStatsLoading />
      {/* <Suspense fallback={<WelcomeStatsLoading />}>
        <WelcomeStats />
      </Suspense> */}
    </>
  );
}
