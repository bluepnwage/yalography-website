import { Skeleton, Card, Grid, Title, FlexContainer } from "@components/shared";

export default function ProjectsLoading() {
  const projects = Array(5).fill(null);
  return (
    <>
      <Title order={"h1"} className="mb-5">
        Projects
      </Title>
      <Grid fullWidth className="mb-16">
        <Card className="col-span-6   relative overflow-hidden">
          <Skeleton.Shimmer />
          <Skeleton className="h-4 w-3/4 my-1" />
        </Card>
        <Card className="col-span-6  relative overflow-hidden">
          <Skeleton.Shimmer />
          <Skeleton className="h-4 w-2/4 my-1" />
        </Card>
      </Grid>

      <Grid fullWidth>
        <div className="col-span-full">
          <Title order={"h2"}>All projects</Title>
        </div>
        <Card className="col-span-full space-y-4 relative overflow-hidden">
          <Skeleton.Shimmer />
          {projects.map((_, key) => {
            return (
              <FlexContainer key={key}>
                <Skeleton className="basis-1/3 h-3 grow" />
                <Skeleton className="basis-1/3 h-3 grow" />
                <Skeleton className="basis-1/3 h-3 grow" />
              </FlexContainer>
            );
          })}
        </Card>
      </Grid>
    </>
  );
}
