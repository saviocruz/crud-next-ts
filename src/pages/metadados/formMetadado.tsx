import { Layout } from "src/components/Layout";
import { Card, Form, Grid, Button, Icon, Confirm, GridColumn, CardContent, FormField, Select, Dropdown, CardHeader, CardMeta, Container, GridRow } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { estadoInicialMetadado, Metadado } from "src/interfaces/interfaces";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const NewPage = (): JSX.Element => {
  const [metadado, setMetadado] = useState<Metadado>(estadoInicialMetadado);
  const [metadados, setMetadados] = useState<Metadado[]>([]);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();
  const { push, back } = useRouter();
  useEffect(() => {
    listarItens();
  }, [])

  useEffect(() => {
    if (typeof router.query.id === "string")
      carregarLista(router.query.id);
  }, [router.query ]);


  const criaNovo = async (metadado: Metadado) =>
    await fetch("http://localhost:5000/metadados", {
      method: "POST",
      body: JSON.stringify(metadado),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const atualizaAtual = async (id: string, metadado: Metadado) => {
    await fetch("http://localhost:5000/metadados/" + id, {
      method: "PATCH",
      body: JSON.stringify(metadado),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (typeof router.query.id === "string") {
        atualizaAtual(router.query.id, metadado);
      } else {
        criaNovo(metadado);
      }
      setMetadado(estadoInicialMetadado);
      router.back( );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) =>
    setMetadado({ ...metadado, [name]: value });

  const listarItens = async () => {
    console.log(metadado)
    fetch('http://localhost:5000/metadados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setMetadados(data)
      })
  }

  const carregarLista = async (id: string) => {

    if (id !== null) {
      const response = await fetch("http://localhost:5000/metadados/" + id);
      const metadado: Metadado = await response.json();
      if (metadado !== null) {
        const re1 = await fetch("http://localhost:5000/metadados/");
        const metadados = await re1.json();
        setMetadados(metadados)
        setMetadado(
          {
            id: metadado.id,
            nome: metadado.nome,
            legenda: metadado.legenda,
            tipo: metadado.tipo,
            ordem: metadado.ordem,
            obrigatorio: metadado.obrigatorio,
            tamanho: metadado.tamanho,
            informacao: metadado.informacao,
            ativo: metadado.ativo,
            criado_em: metadado.criado_em,
          });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (id !== "") {
      try {
        const res = await fetch("http://localhost:3000/api/metadados/" + id, {
          method: "DELETE",
        });
        router.push("/");
      } catch (error) {
        console.log(error);
      }

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
              <GridColumn width={10}>
                <FormField>
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    required={true}
                    placeholder="Digite o nome"
                    name="nome"
                    onChange={handleChange}
                    value={metadado.nome}
                    autoFocus
                  />
                </FormField>
              </GridColumn>

              <GridColumn width={6}>
                <FormField>
                  <label htmlFor="legenda">Legenda</label>
                  <input
                    type="text"

                    
                    required={true}
                    placeholder="Digite uma legenda"
                    name="legenda"
                    onChange={handleChange}
                    value={metadado.legenda}
                    autoFocus
                  />
                </FormField>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn width={4}>
                <FormField>
                  <label htmlFor="tipo">Tipo:</label>
                  <input
                    type="text"
                    name="tipo"
                    id="tipo"
                    maxLength={3}
                    onChange={handleChange}
                    required={true}
                    value={metadado.tipo}
                  ></input>
                </FormField>
              </GridColumn>

              <GridColumn width={3}>
                <FormField>
                  <label htmlFor="ordem">Ordem:</label>
                  <input
                    type="text"
                    name="ordem"
                    id="ordem"
                    maxLength={3}
                    onChange={handleChange}
                    value={metadado.ordem}
                  ></input>
                </FormField>
              </GridColumn>
              <GridColumn width={4}>
                <FormField>
                  <label htmlFor="obrigatorio">Obrigatorio:</label>
                  <input
                    type="text"
                    name="obrigatorio"
                    id="obrigatorio"
                    maxLength={3}
                    onChange={handleChange}
                    value={metadado.obrigatorio}
                  ></input>
                </FormField>
              </GridColumn>
              <GridColumn width={3}>
                <FormField>
                  <label htmlFor="tamanho">Tamanho:</label>
                  <input
                    type="text"
                    name="tamanho"
                    id="tamanho"
                    maxLength={3}
                    onChange={handleChange}
                    value={metadado.tamanho}
                  ></input>
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
                    required={true}
                    onChange={handleChange}
                    value={metadado.ativo}
                  ></input>
                </FormField>
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn width={16}>
                <FormField>
                  <label htmlFor="informacao">Informação:</label>
                  <textarea
                    rows={5}
                 
                    name="informacao"
                    id="informacao"
                    placeholder="digite a imformação a se processada"
                    onChange={handleChange}
                    value={metadado.informacao}
                  ></textarea>
 

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
                <Button onClick={() => back( )}>
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
          header="Remover Item?"
          content={`Você tem certeza que deseja remover esta item ${router.query.id}`}
          open={openConfirm}
          onCancel={() => setOpenConfirm(false)}
          onConfirm={() => typeof router.query.id === "string" && handleDelete(router.query.id)} />

      </Container>

      <br />

    </Layout>
  );
};

export default NewPage;
