import { GetServerSideProps } from "next";
import { Button, Grid, GridColumn, GridRow, Item } from "semantic-ui-react";
import { Layout } from "src/components/Layout";
import { TaskList } from "src/pages/tasks/TaskList";

import { Task } from "src/interfaces/Tasks";
import Padrao from "src/components/Padrao";
import { taskService } from "src/services/tasks.service";

interface Props {
  tasks: Task[];
}

const Task = ({ tasks }: Props) => {

  return (
    <Layout titulo="">
    
        <Padrao   msg="Não há tarefas cadastradas" retorno="/tasks/new" />
   
        <TaskList tasks={tasks} />
   
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("getServerSideProps")
  const tasks = await taskService.getAll()
  return {
    props: { tasks: tasks },
  };
};

export default Task;
