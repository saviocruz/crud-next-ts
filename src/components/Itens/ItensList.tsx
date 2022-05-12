import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Card, CardContent, CardGroup, CardHeader, CardMeta, Icon, } from "semantic-ui-react";

import { Item } from "src/interfaces/interfaces";

interface Props {
  itens: Item[];
  dominioId: number
}

export const ItensList = ({ itens = [], dominioId }: Props) => {
  const router = useRouter();
  
  let id_dominio = router.query.id_dominio
 
   console.log(router.query)

   const id_d = dominioId

  return (

    <div>
      <Button primary  onClick={() => router.back()} >
        <Icon  name="backward"  />
      </Button>
      <Button primary  onClick={() => router.push(`/itens/formItens/?id_dominio=${router.query.id}`)} >
        <Icon  name="bookmark"  />
        Novo
      </Button>
      <br/><br/>

      <CardGroup itemsPerRow={4}>
        {itens.map((item) => (
          <Card
            key={item.id}
          >
            <CardContent>
              <CardHeader> {item.nome}</ CardHeader>
              {item.criado_em && (
                <CardMeta>
                  {new Date(item.criado_em).toLocaleDateString()}
                </CardMeta>
              )}
              <div style={{textAlign: "right"}}>
              <Button primary style={{padding: "8px" }} onClick={() => router.push(`/itens/edit/${item.id}`)} >
                <Icon name="pencil" style={{ margin: "auto"}}/>
              </Button>
              <Button inverted color="red"  style={{padding: "8px" }} onClick={() => router.push(`/itens/edit/${item.id}`)} >
                <Icon name="trash" style={{ margin: "auto"}}/>
              </Button>
              </div>
          
            </CardContent>
          </Card>

        ))}
      </CardGroup>
       
    </div>


  );
};
