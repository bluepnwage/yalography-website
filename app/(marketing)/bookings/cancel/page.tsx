import prisma from "@/lib/prisma";
import { Button, TextInput } from "@aomdev/ui";
import { notFound, redirect } from "next/navigation";
import { Resend } from "resend";
import { CancelButton } from "./cancel-button";
import { EmailTemplate } from "./cancel-email";

const resend = new Resend(process.env.RESEND_API_KEY!);

async function getBooking(id: number) {
  const booking = await prisma.bookings.findUnique({ where: { id } });
  if (!booking) notFound();
  return booking;
}

type Search = string | string[][] | Record<string, string> | URLSearchParams | undefined;

export default async function Page({ searchParams }: { searchParams: Search }) {
  const search = new URLSearchParams(searchParams);
  const id = parseInt(search.get("id") || "");
  if (!id) notFound();
  const booking = await getBooking(id);
  if (!booking) notFound();
  const deleteBooking = async (formData: FormData) => {
    "use server";
    const data = formData.get("confirm")?.toString();
    const booking = await getBooking(id);
    if (data?.toLowerCase() !== "confirm")
      return redirect(`/bookings/cancel?id=${id}&error=You must type confirm to proceed.`);
    await prisma.bookings.delete({ where: { id: booking.id } });
    await resend.emails.send({
      from: "Yalography <yalography@yalography.com>",
      subject: `Booking Cancellation`,
      to: booking.email,
      react: EmailTemplate()
    });
    redirect("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form action={deleteBooking} className="border border-neutral-700 p-4 rounded-md space-y-4">
        <h1 className="font-semibold text-3xl">Cancel booking</h1>
        <TextInput
          error={search.get("error") || undefined}
          name="confirm"
          label={`Type 'CONFIRM' to proceed.`}
        />
        <div className="flex gap-4">
          <Button variant={"neutral"} type="button">
            Keep booking
          </Button>
          <CancelButton />
        </div>
      </form>
    </div>
  );
}
