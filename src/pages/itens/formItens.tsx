import { Layout } from "src/components/Layout";
import { Form, Grid, Button, Icon, GridColumn, FormField, Container, GridRow, Card } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { estadoInicialItem, estadoInicialItemValor, Item, ItemValor, Metadado } from "src/interfaces/interfaces";
import { metadadoService } from "src/services";
import GridInput from "src/components/form/GridInput";
import GridTextarea from "src/components/form/GridTextarea";
import { itemService } from "src/services/itens.service";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const NewPage = (): JSX.Element => {
  const [item, setItem] = useState<Item>(estadoInicialItem);
  const [metadados, setMetadados] = useState<Metadado[]>([]);
  const [itemValor, setItemValor] = useState<ItemValor[]>([]);
  const [itemValo, setItemValo] = useState<ItemValor>(estadoInicialItemValor);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.id)
    if (typeof router.query.id === "string")
      carregar(router.query.id);
  }, [router.query]);



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (typeof router.query.id === "string") {
        itemService.atualiza(item)
      } else {
        itemService.novo(item)
      }
      setItem(estadoInicialItem);
      router.back();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value, id } }: ChangeInputHandler) =>
  {
    
    console.log(name, value, id)
    
    setItemValo({ ...itemValo, [name]: value });
  }

  const carregar = async (id: string) => {
    setLoading(true)
    if (id !== null) {
      const item = await itemService.carregaDados(id)
      const metadados = await metadadoService.carregaItemDominio(item.id_dominio)
      const itemValor = await itemService.carregaItemValor(item.id)

     console.log(itemValor)
     setItemValor(itemValor)

      setMetadados(metadados)
      setItem(item)
    }
    setLoading(false)
  };

  return (
    <Layout titulo="Detalhe do item">
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
                width={6}
                placeholder="Digite o nome"
                handleChange={handleChange}
                value={item.nome}
                autoFocus />
              <GridInput titulo="Descrição:"
                name="descricao"
                required={true}
                width={10}
                handleChange={handleChange}
                value={item.descricao} />
            </GridRow>

            <label>Campos Personalizados</label>
          
            <GridRow  > 
              {itemValor.map((itemValo) =>  ( 
                  <GridColumn  key={itemValo.id}>
                    <GridInput titulo={itemValo.metadado.legenda}
                      name={itemValo.metadado.nome}
                      required={true}
                      width={5}
                      maxLength={20}

           
                      
                      value={itemValo.valor}  />
                  </GridColumn>
             
              ))}
              </GridRow>


 
            <GridRow>
              <GridTextarea titulo="Informação:"
                name="ativo"
                required={true}
                width={16}
                rows={5}
                handleChange={handleChange}
                value={item.informacao} />
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
