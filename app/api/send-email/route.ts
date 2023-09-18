import resend from "@/lib/resend";
import { EmailTemplate } from "../../../components/email-template2";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const json = await req.json();
  await resend.emails.send({
    from: `Yalography <onboarding@resend.dev>`,
    subject: json.subject.toString(),
    to: "activeoutremer@gmail.com",
    react: EmailTemplate(json)
  });
  return NextResponse.json(
    { message: "Email sent! We will get in contact with you as soon as possible" },
    { status: 200 }
  );
};
