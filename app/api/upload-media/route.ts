export const POST = async (req: Request) => {
  const formData = await req.formData();
  console.log(formData.getAll("files"));
  return Response.json({ nice: "Hello there" }, { status: 201 });
};
