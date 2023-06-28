import { NextApiRequest, NextApiResponse } from "next";
import { apiSQL } from "config";
const baseDados = `${apiSQL}/api/posts`;

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  console.log('API POST')
  switch (method) {
    case "GET":
      try {
          fetch(baseDados, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((resp) => { return resp.json()  })
            .then((data) => {  return res.json(data);
            })  
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        const { title, description } = body;

        await fetch("http://localhost:8000/posts", {
          method: "POST",
          body: JSON.stringify({ title, description }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        break;
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}
