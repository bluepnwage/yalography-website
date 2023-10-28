import resend from "@/lib/resend";
import { EmailTemplate } from "../../../components/email-template2";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const json = await req.json();
  // console.log(await resend.domains.list());
  const test = await resend.emails.send({
    from: `Yalography <yalography@yalography.com>`,
    subject: "testing",
    to: json.email,
    react: EmailTemplate(json)
  });
  console.log(test);
  return NextResponse.json(
    { message: "Email sent! We will get in contact with you as soon as possible" },
    { status: 200 }
  );
};
