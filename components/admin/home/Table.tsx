import { Section, Title, Grid } from "@components/shared";

const tableData = Array(10).fill(null);
export function Table() {
  return (
    <Section className="mt-24">
      <Title order={"h2"} className="mb-10">
        Recent Orders
      </Title>
      <Grid gap={"none"} lg={5} className="w-full rounded-md text-center overflow-hidden ring-1 ring-zinc-700 ">
        <p className="border-r border-b border-zinc-600 py-2">Name</p>
        <p className="border-r border-b border-zinc-600 py-2">Type</p>
        <p className="border-r border-b border-zinc-600 py-2">Email</p>
        <p className="border-r border-b border-zinc-600 py-2">Date</p>
        <p className="border-b py-2 border-zinc-600">Amount</p>
        {tableData.map((_, key) => {
          return (
            <Grid gap={"none"} lg={5} key={key} className="text-center w-full col-span-full odd:bg-zinc-800">
              <p className="py-2">Agis Carty</p>
              <p className="py-2">Wedding</p>
              <p className="py-2">a.carty2555@gmail.com</p>
              <p className="py-2">Nov 26, 2022</p>
              <p className="py-2">$150</p>
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
}
