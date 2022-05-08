import { Layout } from "src/components/Layout";
import {   Form, Grid, Button, Icon, Confirm, GridColumn,  FormField,  Container, GridRow } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dominio, estadoInicialDominio, Item, Metadado } from "src/interfaces/interfaces";
import { MetadadoList } from "src/components/metadado/MetadadoList";
import { dominioService, metadadoService } from '../../services';
import { GetServerSideProps } from "next";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Props {
  dominios: Dominio
}

const NewPage = ({ dominios }: Props): JSX.Element => {
  const [dominio, setDominio] = useState<Dominio>(estadoInicialDominio);
  const [metadados, setMetadados] = useState<Metadado[]>([]);
  const [loading, setLoading] = useState(false);
  const [novo, setNovo] = useState(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.id === "string") {
      carregarLista(router.query.id);
    }
    else {
      setNovo(true)
    }

  }, [router.query]);


  const criaNovo = async (dominio: Dominio) =>
    dominioService.novo(dominio)

  const atualizaAtual = async (id: string, dominio: Dominio) => {
    dominioService.atualiza(dominio)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (typeof router.query.id === "string") {
        atualizaAtual(router.query.id, dominio);
      } else {
        criaNovo(dominio);
      }
      setDominio(estadoInicialDominio);
      router.push("/dominio");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) =>
    setDominio({ ...dominio, [name]: value });

  const carregarLista = async (id: string) => {
    setLoading(true);
    const dominio = await dominioService.carregaDados(id);
    const metadados = await metadadoService.carregaDados(id);
    console.log(metadados)
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
            centered
            columns={2}
            verticalAlign="middle"
            style={{ height: "100%", margin: "5px", border: "1px solid #c0c0c0", borderRadius: "10px", }}
          >
            <GridRow>
              <GridColumn width={8}>
                <FormField>
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    required={true}
                    placeholder="Digite o nome"
                    name="nome"
                    onChange={handleChange}
                    value={dominio.nome}
                    autoFocus
                  />
                </FormField>
              </GridColumn>

              <GridColumn width={2}>
                <FormField>
                  <label htmlFor="ativo">Ativo:</label>
                  <input
                    type="text"
                    name="ativo"
                    id="ativo"
                    maxLength={3}
                    onChange={handleChange}
                    value={dominio.ativo}
                  ></input>
                </FormField>
              </GridColumn>
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

        {router.query.id && (
          <Button nos inverted color="red" onClick={() => { setOpenConfirm(true) }} >
            <Icon name="trash" />
            Excluir
          </Button>
        )}

        <Confirm
          header="Remover dominio?"
          content={`Você tem certeza que deseja remover esta dominio ${router.query.id}`}
          open={openConfirm}
          onCancel={() => setOpenConfirm(false)}
          onConfirm={() => typeof router.query.id === "string" && handleDelete(router.query.id)} />

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
