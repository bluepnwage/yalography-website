import { NextApiHandler } from "next";
import admin from "@lib/firebase/admin/config";

const handler: NextApiHandler = async (req, res) => {
  try {
    const name = req.query.name;
    const type = req.query.type;
    const file = admin
      .storage()
      .bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
      .file(name as string)
      .createReadStream();
    console.log(name, type);
    await new Promise((resolve) => {
      res.setHeader("Content-Type", type as string);
      file.pipe(res);
      file.on("end", resolve);
      file.on("error", (e) => {
        console.log(e.message);
        throw e;
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error my friend" });
    res.end();
  }
};

export default handler;
