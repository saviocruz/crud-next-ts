import { apiDados } from "config";
import { NextApiRequest, NextApiResponse } from "next";

const baseDados = `${apiDados}/metadados/`;
 
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id_dominio },
  } = req;
  switch (method) {
    case "GET":
      try {
        console.log(baseDados + "?dominioId=" + id_dominio)
        await fetch(baseDados + "?dominioId=" + id_dominio, {
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
     
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
};
