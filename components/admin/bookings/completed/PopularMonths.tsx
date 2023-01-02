import { formatNum } from "@util/formatNum";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import type { Popular } from "app/admin/bookings/completed/page";

type PropTypes = {
  data: Popular;
};

export function PopularMonths({ data }: PropTypes) {
  return (
    <ScrollAreaDemo height={"100%"} orientation={"vertical"}>
      {data.map((booking) => {
        return (
          <div
            key={booking.type}
            className="flex items-center border-b justify-between -mx-4 first-of-type:-mt-4 p-4 last-of-type:border-0 border-zinc-200 dark:border-zinc-700"
          >
            <span className="capitalize grow font-semibold">{booking.type}</span>
            <div className="flex gap-4 ">
              <div className="text-center">
                <span className="block">{booking.value.count}</span>
                <span className="text-gray-400 text-sm">Count</span>
              </div>
              <div className="text-center">
                <span className="block">${formatNum(booking.value.total)}</span>
                <span className="text-gray-400 text-sm">Total</span>
              </div>
            </div>
          </div>
        );
      })}
    </ScrollAreaDemo>
  );
}
