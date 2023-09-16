export const runtime = "edge";

export const POST = (req: Request) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const token = req.headers.get("Authorization")?.replace("Bearer", "");
  headers.set(`Set-Cookie`, `fb-token=${token}; HttpOnly; Path=/; Max-age=${60 * 60}`);
  return new Response(JSON.stringify({ message: "Token created" }), { status: 200, headers });
};

export const DELETE = (req: Request) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set(`Set-Cookie`, `fb-token=test; HttpOnly; Path=/; Max-age=${0}`);
  return new Response(JSON.stringify({ message: "Token deleted" }), { status: 200, headers });
};
