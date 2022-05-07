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

const Dominio = ({ dominios }: Props) => {
  return (
    <Layout titulo="Domínios cadastrados">
      {dominios.length === 0 ? (
          <Padrao titulo="Dominios cadastradas" msg="Não há dominios cadastradas" retorno="/dominio/new" />
      ) : (
        <DominioList dominios={dominios} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const dominios = await dominioService.getAll()
  return {
    props: { dominios },
  };
};
 
export default Dominio;
