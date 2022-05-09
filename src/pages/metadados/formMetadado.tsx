import { Layout } from "src/components/Layout";
import { Form, Grid, Button, Icon, GridColumn, FormField, Container, GridRow } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { estadoInicialMetadado, Metadado } from "src/interfaces/interfaces";
import { metadadoService } from "src/services";
import GridInput from "src/components/form/GridInput";
import GridTextarea from "src/components/form/GridTextarea";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const NewPage = (): JSX.Element => {
  const [metadado, setMetadado] = useState<Metadado>(estadoInicialMetadado);
  const [metadados, setMetadados] = useState<Metadado[]>([]);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.id === "string")
      carregar(router.query.id);
  }, [router.query]);



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (typeof router.query.id === "string") {
        metadadoService.atualiza(metadado)
      } else {
        metadadoService.novo(metadado)
      }
      setMetadado(estadoInicialMetadado);
      router.back();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) =>
    setMetadado({ ...metadado, [name]: value });


  const carregar = async (id: string) => {
    setLoading(true)
    if (id !== null) {
      const metadado = await metadadoService.carregaDados(id)
      setMetadado(metadado)
    }
    setLoading(false)
  };

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      metadadoService.delete(id)
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
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
        <Button onClick={() => router.back()}>
          <Icon name="undo" />
          Voltar
        </Button>
        <Form onSubmit={handleSubmit} loading={loading}>
          <Grid
            columns={2}
            verticalAlign="middle"
            style={{ height: "100%", margin: "5px", border: "1px solid #c0c0c0", borderRadius: "10px", }} >
            <GridRow>
              <GridInput titulo="Nome:"
                name="nome"
                required={true}
                width={10}
                placeholder="Digite o nome"
                handleChange={handleChange}
                value={metadado.nome}
                autoFocus />
              <GridInput titulo="Legenda:"
                name="legenda"
                required={true}
                width={5}
                handleChange={handleChange}
                value={metadado.legenda} />
            </GridRow>

            <GridRow>
              <GridInput titulo="Tipo:"
                name="tipo"
                required={true}
                width={3}
                maxLength={3}
                handleChange={handleChange}
                value={metadado.tipo} />

              <GridInput titulo="Ordem:"
                name="ordem"
                required={true}
                width={2}
                maxLength={3}
                handleChange={handleChange}
                value={metadado.ordem} />

              <GridInput titulo="Obrigatorio:"
                name="obrigatorio"
                required={true}
                width={2}
                maxLength={3}
                handleChange={handleChange}
                value={metadado.obrigatorio} />

              <GridInput titulo="Tamanho:"
                name="tamanho"
                required={true}
                width={2}
                maxLength={3}
                handleChange={handleChange}
                value={metadado.tamanho} />

              <GridInput titulo="Ativo:"
                name="ativo"
                required={true}
                width={2}
                maxLength={3}
                handleChange={handleChange}
                value={metadado.ativo} />

            </GridRow>
            <GridRow>

              <GridTextarea titulo="Informação:"
                name="ativo"
                required={true}
                width={16}
                rows={5}
                handleChange={handleChange}
                value={metadado.informacao} />


            </GridRow>
            <GridRow >
              <GridColumn width={10}  >
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

              </GridColumn>
            </GridRow>
          </Grid>
        </Form>

        {/*
        {router.query.id && (
                  <Button inverted color="red" onClick={() => setOpenConfirm(true)}>
                    <Icon name="trash" />
                    Excluir
                  </Button>
                )}
        <Confirm
          header="Remover Item?"
          content={`Você tem certeza que deseja remover estE item ${metadado.legenda}`}
          open={openConfirm}
          onCancel={() => setOpenConfirm(false)}
          onConfirm={() => typeof router.query.id === "string" && handleDelete(router.query.id)} />
*/}
      </Container>


      <br />

    </Layout>
  );
};

export default NewPage;
