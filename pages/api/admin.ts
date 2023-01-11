import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge"
};

export default function handler(req: NextRequest) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    switch (req.method) {
      case "POST": {
        headers.set(`Set-Cookie`, `fb-token=${token}; HttpOnly; Path=/; Max-age=${60 * 60}`);
        return new Response(JSON.stringify({ message: "Token created" }), { status: 200, headers });
      }
      case "DELETE": {
        headers.set(`Set-Cookie`, `fb-token=test; HttpOnly; Path=/; Max-age=${0}`);
        return new Response(JSON.stringify({ message: "Token deleted" }), { status: 200, headers });
      }
      default: {
        headers.set("Allow", "POST, DELETE");
        return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405, headers });
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occurred on the server" }), { status: 200, headers });
  }
}
