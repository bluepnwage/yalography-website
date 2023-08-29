import { Grid, Skeleton, FlexContainer } from "@/components/shared";
import { Card } from "@aomdev/ui";
export default function GalleryLoading() {
  return (
    <>
      <Grid fullWidth>
        <div className="flex justify-between mb-10 col-span-full items-center">
          <Skeleton className="h-10 w-64  " />
          <Skeleton className="h-8 w-24 rounded" />
        </div>
        <Card className="col-span-3 flex flex-col gap-4 h-64 relative overflow-hidden">
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
        <Card className="col-span-3 flex flex-col gap-4 h-64 relative overflow-hidden">
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
        <Card className="col-span-3 flex flex-col gap-4 h-64 relative overflow-hidden">
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
        <Card className="col-span-3 flex flex-col gap-4 h-64 relative overflow-hidden">
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
