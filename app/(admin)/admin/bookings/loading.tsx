import { Card, Skeleton, FlexContainer, Grid } from "@/components/shared";

export default function Loading() {
  const bestShoots = Array(5).fill(null);
  const orders = Array(10).fill(null);
  return (
    <Grid fullWidth>
      <Card className="col-span-6 relative overflow-hidden ">
        <Skeleton.Shimmer />
        <Skeleton className="mb-2 h-4 w-1/5" />
        <Skeleton className="h-3 w-2/4" />
      </Card>
      <Card className="col-span-3 relative overflow-hidden">
        <Skeleton.Shimmer />
        <Skeleton className="h-3 mb-2 w-2/4" />
        <Skeleton className="h-3 w-10" />
      </Card>
      <Card className="col-span-3 relative overflow-hidden">
        <Skeleton.Shimmer />
        <Skeleton className="h-3 mb-2 w-2/4" />
        <Skeleton className="h-3 w-10" />
      </Card>

      <Card className="w-full relative overflow-hidden col-span-full h-96 flex">
        <Skeleton.Shimmer />
      </Card>
      <Card className="col-span-4 relative overflow-hidden bg-white dark:bg-zinc-800 rounded-md">
        <Skeleton.Shimmer />
        <Skeleton className="h-5 w-3/4 mb-4" />
        <div className="space-y-4">
          {bestShoots.map((_, key) => {
            return (
              <FlexContainer key={key} className="justify-between items-center">
                <Skeleton className="w-1/4 h-3" />
                <FlexContainer className="gap-4">
                  <FlexContainer direction={"column"} className="gap-4">
                    <Skeleton className="w-3 h-3" />
                    <Skeleton className="w-3 h-3" />
                  </FlexContainer>
                  <FlexContainer direction={"column"} className="gap-4">
                    <Skeleton className="w-3 h-3" />
                    <Skeleton className="w-3 h-3" />
                  </FlexContainer>
                </FlexContainer>
              </FlexContainer>
            );
          })}
        </div>
      </Card>
      <Card className="col-span-8 ring-1 relative overflow-hidden ring-zinc-200 dark:ring-zinc-700 rounded-md bg-white dark:bg-zinc-800 flex flex-col  justify-between h-full">
        <Skeleton.Shimmer />
        {orders.map((_, key) => {
          return (
            <FlexContainer key={key} className="justify-evenly">
              <Skeleton className="h-3 basis-1/3 grow" />
              <Skeleton className="h-3 basis-1/3 grow" />
              <Skeleton className="h-3 basis-1/3 grow" />
            </FlexContainer>
          );
        })}
        <Skeleton />
      </Card>
    </Grid>
  );
}
