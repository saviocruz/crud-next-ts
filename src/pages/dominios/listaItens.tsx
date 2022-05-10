import { Layout } from "src/components/Layout";
import {    useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Item, } from "src/interfaces/interfaces";
import { ItensList } from "src/components/Itens/ItensList";
import { dominioService } from "src/services";
import { Button, Icon } from "semantic-ui-react";
import { itemService } from "src/services/itens.service";

const NewPage = (): JSX.Element => {
  const [itens, setItens] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.id === "string")
      carregarLista(router.query.id);
  }, [router.query]);

  const carregarLista = async (id: string) => {
    const itens: Item[] = await itemService .carregaItensDominio(id);
    setItens(itens)
  };
 
  return (
    <Layout titulo="Lista de Itens">
       
      <ItensList itens={itens} />
    </Layout>
  );
};

export default NewPage;
