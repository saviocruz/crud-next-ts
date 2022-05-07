import { Layout } from "src/components/Layout";
import { Card, Form, Grid, Button, Icon, Confirm, GridColumn, CardContent, FormField, Select, Dropdown, CardHeader, CardMeta, Container, GridRow } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dominio, estadoInicialDominio, Item, Metadado } from "src/interfaces/interfaces";
import { MetadadoList } from "src/components/metadado/MetadadoList";
import { dominioService } from '../../services';

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const NewPage = (): JSX.Element => {
  const [dominio, setDominio] = useState<Dominio>(estadoInicialDominio);
  const [dominios, setDominios] = useState<Dominio[]>([]);
   const [metadados, setMetadados] = useState<Metadado[]>([]);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.id === "string")
      carregarLista(router.query.id);
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
    const [dominio, metadados ] = await dominioService.carregaDados(id);
     
    setDominio(dominio)
    setMetadados(metadados)
    
  };

  const handleDelete = async (id: string) => {
    try {
      dominioService.delete(id)
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout titulo="Detalhe do cadastro">
      <Container
        style={{
          padding: "1rem",
          backgroundColor: "white",
          borderRadius: "10px",
          width: "70%"
        }}>
        <Form onSubmit={handleSubmit}>
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
                  <Button primary loading={loading}>
                    <Icon name="save" />
                    Salva
                  </Button>
                )}
                <Button onClick={() => router.push('/dominio')}>
                  <Icon name="undo" />
                  Voltar
                </Button>
                {router.query.id && (
                  <Button inverted color="red" onClick={() => setOpenConfirm(true)}>
                    <Icon name="trash" />
                    Excluir
                  </Button>
                )}
              </GridColumn>
            </GridRow>
          </Grid>
        </Form>

        <Confirm
          header="Remover dominio?"
          content={`Você tem certeza que deseja remover esta dominio ${router.query.id}`}
          open={openConfirm}
          onCancel={() => setOpenConfirm(false)}
          onConfirm={() => typeof router.query.id === "string" && handleDelete(router.query.id)} />

      </Container>

      <br />

      <MetadadoList metadados={metadados} />


    </Layout>
  );
};

export default NewPage;
