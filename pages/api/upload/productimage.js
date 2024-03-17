import { adminEmails } from "@/utils/constant";
import multiparty from "multiparty";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const form = multiparty.Form();
  const session = await getSession({ req });

  if (
    !session ||
    session.user.role !== "Admin" ||
    !adminEmails?.includes(session?.user?.email)
  ) {
    return res.status(401).json({ error: "You are not authorized" });
  }

  form.parse(req, (error, fields, files) => {
    console.log(files.length);
    res.json("hi");
  });
}

export const config = {
  api: { bodyparser: false },
};
