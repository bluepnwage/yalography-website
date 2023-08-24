import { Grid, Skeleton, Card, FlexContainer } from "@/components/shared";

export default function GalleryLoading() {
  return (
    <>
      <Grid fullWidth className="mb-10">
        <Card className="col-span-4 relative overflow-hidden">
          <Skeleton.Shimmer />
          <FlexContainer className="mb-2 justify-between items-center">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-5 w-3" />
          </FlexContainer>
          <Skeleton className="h-3 w-1/4" />
        </Card>
        <Card className="col-span-4 relative overflow-hidden">
          <Skeleton.Shimmer />
          <FlexContainer className="mb-2 justify-between items-center">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-5 w-3" />
          </FlexContainer>
          <Skeleton className="h-3 w-1/4" />
        </Card>
        <Card className="col-span-4 relative overflow-hidden">
          <Skeleton.Shimmer />
          <FlexContainer className="mb-2 justify-between items-center">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-5 w-3" />
          </FlexContainer>
          <Skeleton className="h-3 w-1/4" />
        </Card>
      </Grid>
      <Grid fullWidth>
        <Card className="col-span-4 flex flex-col gap-4 h-64 relative overflow-hidden">
          <Skeleton.Shimmer />
          <Skeleton className="basis-3/4 -mx-4 -mt-4" />
          <div className="grow space-y-2">
            <Skeleton className="h-4 w-2/4" />
            <FlexContainer className="justify-between">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/5" />
            </FlexContainer>
          </div>
        </Card>
        <Card className="col-span-4 flex flex-col gap-4 h-64 relative overflow-hidden">
          <Skeleton.Shimmer />
          <Skeleton className="basis-3/4 -mx-4 -mt-4" />
          <div className="grow space-y-2">
            <Skeleton className="h-4 w-2/4" />
            <FlexContainer className="justify-between">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/5" />
            </FlexContainer>
          </div>
        </Card>
        <Card className="col-span-4 flex flex-col gap-4 h-64 relative overflow-hidden">
          <Skeleton.Shimmer />
          <Skeleton className="basis-3/4 -mx-4 -mt-4" />
          <div className="grow space-y-2">
            <Skeleton className="h-4 w-2/4" />
            <FlexContainer className="justify-between">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/5" />
            </FlexContainer>
          </div>
        </Card>
      </Grid>
    </>
  );
}
