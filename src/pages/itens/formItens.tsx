import { Layout } from "src/components/Layout";
import { Form, Grid, Button, Icon, GridColumn, FormField, Container, GridRow } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { estadoInicialItem, estadoInicialItemValor, Item, ItemValor, Metadado } from "src/interfaces/interfaces";
import GridInput from "src/components/form/GridInput";
import GridTextarea from "src/components/form/GridTextarea";
import { itemService } from "src/services/itens.service";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const NewPage = (): JSX.Element => {
  const [item, setItem] = useState<Item>(estadoInicialItem);
  const [itemValor, setItemValor] = useState<ItemValor[]>([]);
  const [dominioId, setDominioId] = useState<number>(0);
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.id_dominio)
    
    if (typeof router.query.id === "string")
      carregar(router.query.id );
  }, [router.query]);



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      console.log(router.query.id_dominio)
      
      setItem({ ...item, [item.dominioId]: router.query.id_dominio  });
      const ix = await itemService.getAll()
       item.dominioId = router.query.id_dominio;
       item.id = ix.length;

      
      console.log(item)
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

  const handleChange = ({ target: { name, value, id } }: ChangeInputHandler) => {
    console.log(name, value, id)
    setItem({ ...item, [name]: value });
  }
 
  const carregar = async (id: string ) => {
    setLoading(true)
  
    if (id !== null) {
      
      const item = await itemService.carregaDados(id)
     
      const itemValor = await itemService.carregaItemValor(item.id)
      setItemValor(itemValor)
      setItem(item)
    }
    setLoading(false)
  };

  const updateItem =(id: number, whichvalue: string, newvalue: string)=> {
    let index:number = itemValor.findIndex(x=> x.id === id); 
    console.log(index)
    if (index !== -1){
        let temporaryarray:ItemValor[] = itemValor.slice();
         (temporaryarray as any)[index] [whichvalue] = newvalue;
        setItemValor(temporaryarray);
    }
    else {
        console.log('no match');
    }
}

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
              {itemValor.map((it: ItemValor) => (
                <GridColumn width={5} key={it.id}>
                  <FormField>
                    <label htmlFor={it.metadado?.nome}>{it.metadado?.legenda}
                      {(it.metadado?.obrigatorio === 'SIM') && (
                        <span style={{ color: "red" }} > * </span>)}
                    </label>
                    <input type="text"
                      name={it.metadado?.nome}
                      id={it.metadado?.nome}
                      value={it.valor}
                      required={it.metadado?.obrigatorio === 'SIM'}
                      maxLength={20}
                      onChange={(event) => {
                        updateItem(it.id, 'valor', event.target.value)
                        console.log(itemValor)
                      }
                      }

                    />
                  </FormField>
                </GridColumn>

              ))}
            </GridRow>
            <GridRow>
              <GridTextarea titulo="Informação:"
                name="ativo"
                required={false}
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
