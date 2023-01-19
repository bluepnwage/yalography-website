import { NextApiHandler } from "next";
import admin from "@lib/firebase/admin/config";
import { logError } from "@lib/notion";

const apiURL = "/api/download-image";

const handler: NextApiHandler = async (req, res) => {
  try {
    const name = req.query.name;
    const type = req.query.type;
    const file = admin
      .storage()
      .bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
      .file(name as string)
      .createReadStream();
    await new Promise((resolve) => {
      res.setHeader("Content-Type", type as string);
      file.pipe(res);
      file.on("end", resolve);
      file.on("error", async (e) => {
        await logError({
          apiURL,
          title: "Download image",
          description: e.message,
          stackTrace: e.stack,
          statusCode: 500
        });
        throw e;
      });
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "There was an error downloading your image." });
    }
    res.end();
  }
};

export default handler;
