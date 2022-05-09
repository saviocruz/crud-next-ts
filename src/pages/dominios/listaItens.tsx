import { Layout } from "src/components/Layout";
import {    useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Item, } from "src/interfaces/interfaces";
import { ItensList } from "src/components/Itens/ItensList";
import { dominioService } from "src/services";
import { Button, Icon } from "semantic-ui-react";

const NewPage = (): JSX.Element => {
  const [itens, setItens] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.id === "string")
      carregarLista(router.query.id);
  }, [router.query]);

  const carregarLista = async (id: string) => {
    const itens: Item[] = await dominioService.carregaItens(id);
    setItens(itens)
  };

  const handleDelete = async (id: string) => {
    dominioService.delete(id)
  };

  return (
    <Layout titulo="Lista de ">
       <Button primary  onClick={() => router.back()} >
        <Icon  name="backward"  />
      </Button>
      <Button primary  onClick={() => router.push(`/itens/edit/`)} >
        <Icon  name="bookmark"  />
        Novo
      </Button>
      <br/><br/>
      <ItensList itens={itens} />
    </Layout>
  );
};

export default NewPage;
