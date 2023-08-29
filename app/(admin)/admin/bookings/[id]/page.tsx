import { notFound } from "next/navigation";
import { Booking } from "./booking";
import { Order } from "./order";

type Search = string | string[][] | Record<string, string> | URLSearchParams | undefined;

export default async function BookingPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: Search;
}) {
  const id = parseInt(params.id);
  const search = new URLSearchParams(searchParams);
  if (!id) notFound();
  const completed = search.get("completed");
  return <>{!completed ? <Booking id={id} /> : <Order id={id} />}</>;
}
