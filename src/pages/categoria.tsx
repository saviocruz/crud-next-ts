import { GetServerSideProps } from "next";
import { Button, Grid, GridColumn, GridRow, Item } from "semantic-ui-react";
import { Layout } from "src/components/Layout";
import { BiTaskX } from "react-icons/bi";
import { CategoriaList } from "src/components/categoria/CategoriaList";
import { useRouter } from "next/router";
import { Categoria } from "src/interfaces/interfaces";
import Padrao from "src/components/Padrao";

interface Props {
  categorias: Categoria[];
}

const Categoria = ({ categorias }: Props) => {

  return (
    <Layout titulo="Categorias cadastradas">
      {categorias.length === 0 ? (
          <Padrao   msg="Não há categorias cadastradas" retorno="/categorias/new" />
      ) : (
        <CategoriaList categorias={categorias} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/categorias");
  const data = await res.json();
  const categorias = data.map((item: Categoria) => item)
  return {
    props: { categorias },
  };
};

export default Categoria;
