import { Layout } from "src/components/Layout";
import {  Form, Grid, Button, Icon, Confirm, GridColumn, FormField, Select,  Container, GridRow } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Categoria, estadoInicialCategoria } from "src/interfaces/interfaces";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const NewPage = (): JSX.Element => {
  const [categoria, setCategoria] = useState<Categoria>(estadoInicialCategoria);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();


  useEffect(() => {
    listaCategorias();
  }, [])

  useEffect(() => {
    if (typeof router.query.id === "string")
      carregaCategoria(router.query.id);
  }, [router.query, categorias]);


  const createCategoria = async (categoria: Categoria) =>
    await fetch("http://localhost:5000/api/categorias", {
      method: "POST",
      body: JSON.stringify(categoria),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const updateCategoria = async (id: string, categoria: Categoria) => {
    await fetch("http://localhost:5000/categorias/" + id, {
      method: "PATCH",
      body: JSON.stringify(categoria),
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"

      },
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (typeof router.query.id === "string") {
        updateCategoria(router.query.id, categoria);
      } else {
        createCategoria(categoria);
      }
      setCategoria(estadoInicialCategoria);
      router.push("/categoria");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) =>
    setCategoria({ ...categoria, [name]: value });

  const handleCategory = async (e: any, value: string | undefined, name: string) => {
    //console.log(value)
    setLoading(true);
    const response = await fetch("http://localhost:3000/api/categorias/" + value);

    const categoria_superior: Categoria = await response.json()
    console.log(name)
    console.log(value)

    //categoria.categoria = categoria_superior
    setCategoria({
      ...categoria,
      [name]: categoria_superior.id
    })



    //console.log(categoria)
    setLoading(false);
  }

  const listaCategorias = async () => {
    /*  const reponse = await fetch("http://localhost:3000/api/categorias/");
      const categorias = await reponse.json();
      console.log(categorias)
      setCategorias(categorias);
      */
    console.log(categoria)
    fetch('http://localhost:5000/categorias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategorias(data)
      })
  }

  const carregaCategoria = async (id: string) => {

    if (id !== null) {
      console.log(id)
      const response = await fetch("http://localhost:3000/api/categorias/" + id);
      const categoria = await response.json();

      if (categoria !== null) {
        const reponse_superior = await fetch("http://localhost:3000/api/categorias/" + categoria.id_categoria);
        const categoria_superior = await reponse_superior.json();

        setCategoria(
          {
            id: categoria.id,
            nome: categoria.nome,
            sigla: categoria.sigla,
            ativo: categoria.ativo,
            categoriaId: categoria.categoriaId,
            restrito: categoria.restrito,
            criado_em: categoria.criado_em,
            categoria: categoria_superior,
          });
      }
    }
    console.log(1)
  };

  const handleDelete = async (id: string) => {
    if (id !== "") {
      try {
        const res = await fetch("http://localhost:3000/api/categorias/" + id, {
          method: "DELETE",
        });
        router.push("/");
      } catch (error) {
        console.log(error);
      }
      console.log(1)
    }
  };

  const options = categorias.map(cat => ({
    key: cat.id || '',
    text: cat.id + "-" + cat.nome || '',
    value: cat.id || '',
  }))

  return (

    <Layout>
      <Container
        style={{
          padding: "1rem",
          backgroundColor: "white",
          borderRadius: "10px",
          width: "70%"
        }}>
        <Form onSubmit={handleSubmit}>
          <Grid
            columns={2}
            verticalAlign="middle"
            style={{ height: "100%", margin: "5px", border: "1px solid #c0c0c0", borderRadius: "10px", }}>
            <GridRow >
              <GridColumn width={14}>
                <FormField>
                  <label htmlFor="nome">Categoria Superior</label>
                  <Select
                    name="categoriaId"
                    id="categoriaId"
                    options={options}
                    onChange={(e: any, { value, name }) => handleCategory(e, value?.toString(), name)}
                    value={categoria.categoriaId} />
                </FormField>
              </GridColumn>
            </GridRow>

            <GridRow style={{ border: "0px solid #c0c0c0" }}>
              <GridColumn width={12}>
                <FormField>
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    required={true}
                    placeholder="Digite o nome"
                    name="nome"
                    width="80%"
                    onChange={handleChange}
                    value={categoria.nome}
                    autoFocus
                  />
                </FormField>
              </GridColumn>
              <GridColumn width={2}>
                <FormField>
                  <label htmlFor="sigla">Sigla:</label>
                  <input
                    type="text"
                    required={false}
                    placeholder="Digite uma sigla (opcional)"
                    name="sigla"
                    id="sigla"
                    width="20%"
                    onChange={handleChange}
                    value={categoria.sigla || ''}
                  ></input>
                </FormField>
              </GridColumn>
            </GridRow>


            <GridRow style={{ border: "0px solid #c0c0c0", }} >
              <GridColumn width={4} style={{ border: "0px solid #c0c0c0" }}>
                <FormField>
                  <label htmlFor="ativo">Ativo:</label>
                  <input
                    type="text"
                    name="ativo"
                    id="ativo"
                    maxLength={3}
                    onChange={handleChange}
                    value={categoria.ativo}
                  ></input>
                </FormField>
              </GridColumn>
              <GridColumn width={4}>
                <FormField>
                  <label htmlFor="restrito">Restrito:</label>
                  <input
                    type="text"
                    name="restrito"
                    id="restrito"
                    maxLength={3}
                    onChange={handleChange}
                    value={categoria.restrito}
                  ></input>
                </FormField>
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>


                {router.query.id ? (
                  <Button color="teal" loading={loading}>
                    <Icon name="save" />
                    Update
                  </Button>
                ) : (
                  <Button primary loading={loading}>
                    <Icon name="save" />
                    Save
                  </Button>
                )}
                <Button onClick={() => router.push('/dominio')}>
                  <Icon name="undo" />
                  Voltar
                </Button>



                {router.query.id && (
                  <Button inverted color="red" onClick={() => setOpenConfirm(true)}>
                    <Icon name="trash" />
                    Delete
                  </Button>
                )}
              </GridColumn>
            </GridRow>
          </Grid>
        </Form>
      </Container>
      <Confirm
        header="Remover CATEGORIA?"
        content={`Você tem certeza que deseja remover esta categoria ${router.query.id}`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          typeof router.query.id === "string" && handleDelete(router.query.id)
        }
      />
    </Layout>
  );
};

export default NewPage;
