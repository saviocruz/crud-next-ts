import { useRouter } from "next/router";
import { Button, Card, CardContent, CardGroup, CardHeader, CardMeta, Icon, } from "semantic-ui-react";

import { Item } from "src/interfaces/interfaces";

interface Props {
  itens: Item[];
}

export const ItensList = ({ itens = [] }: Props) => {
  const router = useRouter();

  return (

    <div>
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
              <Button inverted color="red" style={{padding: "8px" }} onClick={() => router.push(`/itens/edit/${item.id}`)} >
                <Icon name="pencil" style={{ margin: "auto"}}/>
              </Button>
              <Button primary style={{padding: "8px" }} onClick={() => router.push(`/itens/edit/${item.id}`)} >
                <Icon name="trash" style={{ margin: "auto"}}/>
              </Button>
              
          
            </CardContent>
          </Card>

        ))}
      </CardGroup>
       
    </div>


  );
};
