import { Section, Title } from "@components/shared";

const tableData = Array(10).fill(null);
export function Table() {
  return (
    <Section className="mt-24">
      <Title order={"h2"} className="mb-10">
        Recent Orders
      </Title>
      <table className="w-full rounded-md overflow-hidden ring-1 ring-zinc-700 ">
        <tr className="bg-zinc-800 ">
          <th className="border-r border-zinc-600 py-2">Name</th>
          <th className="border-r border-zinc-600">Type</th>
          <th className="border-r border-zinc-600">Email</th>
          <th className="border-r border-zinc-600">Date</th>
          <th>Amount</th>
        </tr>
        {tableData.map((_, key) => {
          return (
            <tr key={key} className="text-center odd:bg-zinc-800">
              <td className="py-2">Agis Carty</td>
              <td>Wedding</td>
              <td>a.carty2555@gmail.com</td>
              <td>Nov 26, 2022</td>
              <td>$150</td>
            </tr>
          );
        })}
      </table>
    </Section>
  );
}
