import { useRouter } from "next/router";
import { Card, CardContent, CardGroup, CardHeader, CardMeta, Icon, } from "semantic-ui-react";

import { Item } from "src/interfaces/interfaces";

interface Props {
  itens: Item[];
}

export const ItensList = ({ itens = [] }: Props) => {
  const router = useRouter();

  return (

    <div>
      <CardGroup >
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
              <button onClick={() => router.push(`/itens/edit/${item.id}`)} >
                <Icon name="pencil" />
              </button>
          
            </CardContent>
          </Card>

        ))}
      </CardGroup>
       
    </div>


  );
};
