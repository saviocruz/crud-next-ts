import { NextApiRequest, NextApiResponse } from "next";
 
export const config = {
  api: {
    externalResolver: true,
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        try {
          fetch('http://localhost:5000/categorias?categoriaId_ne=&_expand=categoria', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((resp) => {
              return resp.json()
            })
            .then((data) => {
              return res.status(202).json(data);
            })  
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        }


      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "POST":
      try {
        const { title, description } = body;

        const query =
          "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *";
        const values = [title, description];

       // const response = await conn.query(query, values);

        return null;//res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}
