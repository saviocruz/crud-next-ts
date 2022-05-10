import { Layout } from "src/components/Layout";
import { Form, Grid, Button, Icon, Confirm, GridColumn, FormField, Container, GridRow } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dominio, estadoInicialDominio, Item, Metadado } from "src/interfaces/interfaces";
import { MetadadoList } from "src/components/metadado/MetadadoList";
import { dominioService, metadadoService } from '../../services';
import { GetServerSideProps } from "next";
import GridInput from "src/components/form/GridInput";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Props {
  dominios: Dominio
}

const NewPage = ({ dominios }: Props): JSX.Element => {
  const [dominio, setDominio] = useState<Dominio>(estadoInicialDominio);
  const [metadados, setMetadados] = useState<Metadado[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [novo, setNovo] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setNovo(typeof router.query.id !== "string")
    if (typeof router.query.id === "string") {
      carregar(router.query.id);
    }
  }, [router.query]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (typeof router.query.id === "string") {
        dominioService.atualiza(dominio)
      } else {
        dominioService.novo(dominio)
      }
      setDominio(estadoInicialDominio);
      router.back();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) =>
    setDominio({ ...dominio, [name]: value }); 

  const carregar = async (id: string) => {
    setLoading(true);
    const dominio = await dominioService.carregaDados(id);
    const metadados = await metadadoService.carregaMetadadoDominio(id);
    setDominio(dominio)
    setMetadados(metadados)
    setLoading(false);

  };

  const handleDelete = async (id: string) => {
    try {
      dominioService.delete(id)
      router.push("/dominio");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout titulo="Detalhe do cadastro" >

                        
      <Container
        style={{
          padding: "1rem",
          backgroundColor: "white",
          borderRadius: "10px",
          width: "70%"
        }}>
        <Button onClick={() => router.back()} >
          <Icon name="arrow left" />
          Voltar
        </Button>
        <Form onSubmit={handleSubmit} loading={loading}>
        <Grid
            columns={2}
            verticalAlign="middle"
            style={{ height: "100%", margin: "5px", border: "1px solid #c0c0c0", borderRadius: "5px", }} >
            <GridRow>
              <GridInput titulo="Nome:"
                name="nome"
                required={true}
                width={8}
         
                handleChange={handleChange}
                value={dominio.nome} />
                
              <GridInput titulo="Ativo:"
                width={2}
                handleChange={handleChange}
                name="ativo"
                value={dominio.ativo} />
            </GridRow>
            <GridRow>
              <GridColumn width={10}>
                {router.query.id ? (
                  <Button color="teal" loading={loading}>
                    <Icon name="save" />
                    Atualiza
                  </Button>
                ) : (
                  <Button primary loading={loading}  >
                    <Icon name="save" />
                    Salva
                  </Button>
                )}
              </GridColumn>
            </GridRow>
          </Grid>
        </Form>



      </Container>

      <br />
      {!novo ? (
        <MetadadoList metadados={metadados} />
      ) : (<></>)}

    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const dominios = await dominioService.getAll()
  return {
    props: { dominios },
  };
};

export default NewPage;
