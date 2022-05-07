import { Layout } from "src/components/Layout";
import { Card, Form, Grid, Button, Icon, Confirm, GridColumn, CardContent, FormField, Select, Dropdown, CardHeader, CardMeta, Container, GridRow } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dominio, estadoInicialDominio, Item, Metadado } from "src/interfaces/interfaces";
import { MetadadoList } from "src/components/metadado/MetadadoList";
import { ItensList } from "src/components/Itens/ItensList";
import { dominioService } from "src/services";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const NewPage = (): JSX.Element => {
  const [dominio, setDominio] = useState<Dominio>(estadoInicialDominio);
  const [dominios, setDominios] = useState<Dominio[]>([]);
  const [itens, setItens] = useState<Item[]>([]);
   const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();
   useEffect(() => {
    //listaDominios();
    console.log("Inicio edit docminio com os metadados")
  }, [])

  useEffect(() => {
    if (typeof router.query.id === "string")
      carregarLista(router.query.id);
  }, [router.query, dominios]);


  const criaNovo = async (dominio: Dominio) =>
    await fetch("http://localhost:5000/dominios", {
      method: "POST",
      body: JSON.stringify(dominio),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const atualizaAtual = async (id: string, dominio: Dominio) => {
    await fetch("http://localhost:5000/dominios/" + id, {
      method: "PATCH",
      body: JSON.stringify(dominio),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  
  const carregarLista = async (id: string) => {
    const [dominio, metadados,  itens ] = await dominioService.carregaDados(id);
     
    setDominio(dominio)
    setItens(itens)
    
  

  
  };

  const handleDelete = async (id: string) => {
    if (id !== "") {
      try {
        const res = await fetch("http://localhost:3000/api/dominios/" + id, {
          method: "DELETE",
        });
        router.push("/");
      } catch (error) {
        console.log(error);
      }
 
    }
  };

  return (
    <Layout titulo="Lista de ">
      <ItensList itens={itens}/>
    </Layout>
  );
};

export default NewPage;
