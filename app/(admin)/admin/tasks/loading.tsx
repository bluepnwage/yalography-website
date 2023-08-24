import { Card, FlexContainer, Grid, Skeleton, Title } from "@/components/shared";

export default function TasksPageLoading() {
  const taskLists = Array(5).fill(null);
  const tasks = Array(10).fill(null);

  return (
    <>
      <Title order={"h2"} className="mb-5">
        Pinned Lists
      </Title>
      <Grid fullWidth className="mb-20">
        <Card className="relative overflow-hidden col-span-4">
          <Skeleton.Shimmer />
          <FlexContainer className="justify-between">
            <Skeleton className="h-4 w-2/4 mb-4" />
            <Skeleton className="h-5 w-2 " />
          </FlexContainer>
          <Skeleton className="h-3 w-2/5 mb-4" />
          <Skeleton className="h-3 w-1/4" />
        </Card>
        <Card className="relative overflow-hidden col-span-4">
          <Skeleton.Shimmer />
          <FlexContainer className="justify-between">
            <Skeleton className="h-4 w-2/4 mb-4" />
            <Skeleton className="h-5 w-2 " />
          </FlexContainer>
          <Skeleton className="h-3 w-2/5 mb-4" />
          <Skeleton className="h-3 w-2/5 mb-4" />
          <Skeleton className="h-3 w-1/4" />
        </Card>
        <Card className="relative overflow-hidden col-span-4">
          <Skeleton.Shimmer />
          <FlexContainer className="justify-between">
            <Skeleton className="h-4 w-2/4 mb-4" />
            <Skeleton className="h-5 w-2 " />
          </FlexContainer>
          <Skeleton className="h-3 w-2/5 mb-4" />
          <Skeleton className="h-3 w-1/4" />
        </Card>
      </Grid>
      <Grid fullWidth>
        <Card className="relative overflow-hidden space-y-4 col-span-4">
          <Skeleton.Shimmer />
          {taskLists.map((_, key) => {
            return (
              <div key={key}>
                <FlexContainer className="justify-between mb-4">
                  <Skeleton className="h-4 w-2/4" />
                  <FlexContainer className="gap-2">
                    <Skeleton radius={"md"} className="w-4 h-4" />
                    <Skeleton radius={"md"} className="w-4 h-4" />
                  </FlexContainer>
                </FlexContainer>
                <Skeleton className="h-3 w-1/4" />
              </div>
            );
          })}
        </Card>
        <Card className="col-span-8 space-y-4 relative overflow-hidden">
          <Skeleton.Shimmer />

          {tasks.map((_, key) => {
            return (
              <div key={key}>
                <FlexContainer className="justify-evenly gap-4">
                  <Skeleton className="basis-1/5 grow h-3" />
                  <Skeleton className="basis-1/5 grow h-3" />
                  <Skeleton className="basis-1/5 grow h-3" />
                  <Skeleton className="basis-1/5 grow h-3" />
                  <Skeleton className="basis-1/5 grow h-3" />
                </FlexContainer>
              </div>
            );
          })}
        </Card>
      </Grid>
    </>
  );
}
