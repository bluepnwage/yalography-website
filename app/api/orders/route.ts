import prisma from "@/lib/prisma";
import type { Orders } from "@prisma/client";
import { handlePromise } from "@/util/handle-promise";

async function createOrder(data: Orders) {
  const order = await prisma.orders.create({
    data
  });
  return order;
}

export const POST = async (req: Request) => {
  try {
    const json = await req.json();
    const orderPromise = createOrder(json);
    const [status, data] = await handlePromise(orderPromise);
    if (status === "error") {
      throw new Error("Failed to create order");
    } else {
      return new Response(JSON.stringify({ message: "Order created", data }), { status: 201 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occurred on the server" }), { status: 500 });
  }
};
