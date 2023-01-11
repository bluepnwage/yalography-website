import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      await res.revalidate("/gallery");
      return res.status(200).json({ message: "Gallery revalidated" });
    }
  } catch (error) {
    return res.status(500).json({ message: "There was an error revalidating the gallery" });
  }
};

export default handler;
