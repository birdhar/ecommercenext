import multiparty from "multiparty";
export default async function handler(req, res) {
  const form = multiparty.Form();

  form.parse(req, (error, fields, files) => {
    console.log(files.length);
    res.json("hi");
  });
}

export const config = {
  api: { bodyparser: false },
};
