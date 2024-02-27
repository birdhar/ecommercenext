import {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";
import { checkAdmin } from "./auth/[...nextauth]";

async function handlePostFormReq(req, res) {
  const form = formidable({ multiple: true });
  checkAdmin(req, res);

  const formData = new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("err", err);
        reject("error");
      }
      resolve({ fields, files });
    });
  });

  try {
    const { fields, files } = await formData;

    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
    let generatedlinks = [];
    for (const file of files.file) {
      const extension = file.originalFilename.split(".").pop();
      const fileName = Date.now() + "." + extension;

      await client.send(
        new PutObjectCommand({
          Bucket: "ecommercenext-birat",
          Key: fileName,
          Body: fs.readFileSync(file.filepath),
          ACL: "public-read",
          ContentType: file.mimetype,
        })
      );

      const generatedlink = `https://ecommercenext-birat.s3.amazonaws.com/${fileName}`;

      generatedlinks.push(generatedlink);
    }

    res.json({ links: generatedlinks });
    return;
  } catch (e) {
    res.status(400).send({ status: "invalid submission" });
    return;
  }
}

export default async function handler(req, res) {
  if (req.method == "POST") {
    await handlePostFormReq(req, res);
  } else {
    res.status(404).send("method not found");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
