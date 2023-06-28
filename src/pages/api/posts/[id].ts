import { NextApiRequest, NextApiResponse } from "next";


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
        await fetch('http://localhost:5000/tasks/'+id, {
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
    case "PUT":
      try {
        const { title, description } = body;
        const text =
          "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
        const values = [title, description, id];
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        const text = "DELETE FROM tasks WHERE id = $1 RETURNING *";
        const values = [id];

        return res.status(404).json({ message: "Task Not Found" });

      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
      break;
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
};
