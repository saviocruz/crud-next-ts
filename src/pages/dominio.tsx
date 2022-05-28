import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { DominioList } from "src/components/dominio/DominioList";
import { Layout } from "src/components/Layout";
import Padrao from "src/components/Padrao";
import { Dominio } from "src/interfaces/interfaces";
import { dominioService } from "src/services";

interface Props {
  dominios: Dominio[]
}

const DominioForm = ({ dominios }: Props) => {
  return (
    <Layout>

      <Padrao titulo="Dominios cadastradas" msg="Não há dominios cadastradas" retorno="/dominios/formDominio" />
      <DominioList dominios={dominios} />

    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const dominios = await dominioService.getAll()
  return {
    props: { dominios: dominios },
  };
};

export default DominioForm;
