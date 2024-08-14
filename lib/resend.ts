import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const emailSender = `Yalography <${process.env.EMAIL_SENDER}>`;

export default resend;
