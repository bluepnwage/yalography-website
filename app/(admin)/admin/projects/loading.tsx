import { Skeleton, Grid, FlexContainer } from "@/components/shared";
import { Card, Title } from "@aomdev/ui";

export default function ProjectsLoading() {
  const projects = Array(5).fill(null);
  return (
    <>
      <Title order={1} className="mb-5 font-heading font-medium">
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
          <Title order={2} className="font-heading font-medium">
            All projects
          </Title>
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
