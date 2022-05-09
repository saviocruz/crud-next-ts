import { apiDados } from "config";
import { NextApiRequest, NextApiResponse } from "next";

const baseDados = `${apiDados}/dominios/`;
 
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        await fetch(baseDados + id, {
          method: 'GET',
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
    case "PATCH":
      try {
        await fetch(baseDados+ id, {
          method: 'PUT',
          body:JSON.stringify(body),
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
    case "DELETE":
      try {
        await fetch(baseDados+ id, {
          method: 'DELETE',
          body:JSON.stringify(body),
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
};
