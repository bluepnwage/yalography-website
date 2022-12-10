import { Anchor, Button, Title, Card, Grid, Breadcrumbs } from "@components/shared";

export default function ApprovedReservation() {
  return (
    <>
      <Breadcrumbs>
        <Anchor href={"/admin/reservations"}>Reservations</Anchor>
        <Anchor href={"/admin/reservations/approved"}>Approved</Anchor>
        <Anchor href={"/admin/reservations/approved/test"}>Random reservation</Anchor>
      </Breadcrumbs>
      <div className="flex ml-auto mb-16 mt-10 justify-between">
        <Title order={"h1"} className="text-3xl">
          Dec, 10 2022
        </Title>
        <div className="flex gap-2">
          <Button intent="accept" className="h-fit">
            Send Email
          </Button>
          <Button intent="reject" className="h-fit">
            Cancel reservation
          </Button>
        </div>
      </div>
      <Card gradientBorder containerStyles="rounded-md mb-5" className="">
        <Grid fullWidth>
          <div className="col-span-6 space-y-2">
            <Title order={"h2"}>Contact information</Title>

            <p>
              <span className="font-semibold">Name:</span> Agis Carty
            </p>
            <p>
              <span className="font-semibold">Email:</span> email@gmail.com
            </p>
            <p>
              <span className="font-semibold">Phone number:</span> 0690 555 55555
            </p>
          </div>
          <div className="col-span-6 space-y-2">
            <Title order={"h2"}>Reservations details</Title>
            <p>
              <span className="font-semibold">Photoshoot type:</span> Wedding
            </p>
            <p>
              <span className="font-semibold">Date:</span> 21/07/2022. 13:00h
            </p>
            <strong className="inline-block">Selected features:</strong>
            <ul className="list-disc pl-4">
              <li>Decor</li>
              <li>Assistant</li>
              <li>Makeup</li>
            </ul>
          </div>
          <div className="col-span-6">
            <Title className="mb-5" order={"h2"}>
              Additional comments
            </Title>
            <p className="text-lg">
              In proident est occaecat esse reprehenderit exercitation qui aute sint laborum laboris. Ut est eiusmod
              pariatur enim aliqua. Qui ea duis incididunt veniam pariatur deserunt irure. Ipsum id consectetur pariatur
              esse sunt ipsum.
            </p>
          </div>
        </Grid>
      </Card>
      <div className="flex justify-between">
        <Button intent={"secondary"}>Previous</Button>
        <Button>Next</Button>
      </div>
    </>
  );
}
