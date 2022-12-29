import { Title } from "@components/shared";
import type { TableData } from "./TableContainer";

type PropTypes = {
  data: TableData;
};

export default function Table({ data }: PropTypes) {
  return (
    <div className="flex flex-col items-center mb-20">
      <Title order={"h2"} className="mb-10">
        Recently completed bookings
      </Title>
      <table className="bg-white w-full dark:bg-transparent rounded-md text-center overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-700 ">
        <tr>
          <th className="border-r border-b border-zinc-300 dark:border-zinc-600 py-2">Name</th>
          <th className="border-r border-b border-zinc-300 dark:border-zinc-600 py-2">Type</th>
          <th className="border-r border-b border-zinc-300 dark:border-zinc-600 py-2">Email</th>
          <th className="border-r border-b border-zinc-300 dark:border-zinc-600 py-2">Date</th>
          <th className="border-b py-2 border-zinc-300 dark:border-zinc-600">Amount</th>
        </tr>
        {data.map((order) => {
          return (
            <tr key={order.id} className="text-center col-span-full odd:bg-gray-200 dark:odd:bg-zinc-800">
              <td className="py-2">
                {order.booking.firstName} {order.booking.lastName}
              </td>
              <td className="py-2">{order.booking.type}</td>
              <td className="py-2">{order.booking.email}</td>
              <td className="py-2">{order.createdAt}</td>
              <td className="py-2">{order.quote}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
