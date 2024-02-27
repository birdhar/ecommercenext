import multiparty from "multiparty";
import { checkAdmin } from "../auth/[...nextauth]";
export default async function handler(req, res) {
  const form = multiparty.Form();
  checkAdmin(req, res);

  form.parse(req, (error, fields, files) => {
    console.log(files.length);
    res.json("hi");
  });
}

export const config = {
  api: { bodyparser: false },
};
