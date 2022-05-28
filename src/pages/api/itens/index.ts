import { apiDados } from "config";
import { NextApiRequest, NextApiResponse } from "next";

const baseDados = `${apiDados}/itens/`;


// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        fetch(baseDados, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => { return resp.json() })
          .then((data) => {
            return res.json(data);
          })
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        await fetch(baseDados, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => {
            return resp.json()
          })
          .then((data) => {
            return res.json(data);
          })

      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
      break;
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}
