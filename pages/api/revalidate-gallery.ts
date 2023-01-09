import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  } else {
    await res.revalidate("/gallery");
  }
  try {
  } catch (error) {
    res.status(500).json({ message: "An error occurred on the server" });
  }
};

export default handler;
