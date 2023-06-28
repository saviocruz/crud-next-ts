import { Layout } from "src/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Item, } from "src/interfaces/interfaces";
 
import { itemService } from "src/services/itens.service";
import { ItensList } from "../itens/ItensList";

const NewPage = (): JSX.Element => {
  const [itens, setItens] = useState<Item[]>([]);
  const [dominioId, setDominioId] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.id === "string")
      carregarLista(router.query.id);
  }, [router.query]);

  const carregarLista = async (id: string) => {
    const itens: Item[] = await itemService.carregaItensDominio(id);
    setItens(itens)
    
    
    //console.log(itens)
     
   // itens.map((item) => {
  //    setDominioId(item.dominioId)
  //    console.log(item.dominioId)
  //  }
 //   )
  //  console.log(dominioId)


  };

  return (
    <Layout titulo="Lista de Itens">
      <ItensList itens={itens} dominioId={dominioId} />
    </Layout>
  );
};

export default NewPage;
