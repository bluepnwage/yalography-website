import { notFound } from "next/navigation";
import { Booking } from "./booking";
import { Order } from "./order";

type Search = string | string[][] | Record<string, string> | URLSearchParams | undefined;

export default async function BookingPage({ params, searchParams }: PageProps<"/admin/bookings/[id]">) {
  const _params = await params;
  const id = _params.id;
  const search = new URLSearchParams((await searchParams) as Search);
  if (!id) notFound();
  const completed = search.get("completed");
  return <>{!completed ? <Booking id={id} /> : <Order id={id} />}</>;
}
