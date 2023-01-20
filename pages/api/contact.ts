import type { NextApiHandler } from "next";
import { saveMessage } from "@lib/notion";

const handler: NextApiHandler = async (req, res) => {
  try {
    const json = req.body;
    switch (req.method) {
      case "POST": {
        console.log(json);
        await saveMessage(json);
        return res.status(201).json({ message: "Message sent successfully" });
      }
      default: {
        return res.status(405).json({ message: "Method not allowed" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occured on the server" });
  }
};

export default handler;
