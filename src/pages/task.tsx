import { GetServerSideProps } from "next";
import { Button, Grid, GridColumn, GridRow, Item } from "semantic-ui-react";
import { Layout } from "src/components/Layout";
import { BiTaskX } from "react-icons/bi";
import { TaskList } from "src/components/tasks/TaskList";
import { useRouter } from "next/router";
import { Task } from "src/interfaces/Tasks";
import Padrao from "src/components/Padrao";

interface Props {
  tasks: Task[];
}

const Task = ({ tasks }: Props) => {

  return (
    <Layout titulo="">
      {tasks.length === 0 ? (
        <Padrao   msg="Não há categorias cadastradas" retorno="/categorias/new" />
    
      ) : (
        <TaskList tasks={tasks} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const data = await res.json();
  const tasks = data.map((item:Task) => item)
//  console.log(tasks)
  return {
    props: { tasks },
  };
};

export default Task;
