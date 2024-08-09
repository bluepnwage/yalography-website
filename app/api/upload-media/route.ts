import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  console.log(formData.getAll("files"));
  return NextResponse.json({ nice: "Hello there" }, { status: 201 });
};
