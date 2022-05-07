import { useRouter } from "next/router";
import { Card, CardContent, CardGroup, CardHeader, CardMeta, Icon, } from "semantic-ui-react";

import { Dominio } from "src/interfaces/interfaces";
import { ItensList } from "../Itens/ItensList";

interface Props {
  dominios: Dominio[];
}

export const DominioList = ({ dominios = [] }: Props) => {
  const router = useRouter();


   


  return (

    <div>
      <CardGroup >
        {dominios.map((dominio) => (
          <Card
            key={dominio.id}
          >
            <CardContent>
              <CardHeader> {dominio.nome}</ CardHeader>
              {dominio.criado_em && (
                <CardMeta>
                  {new Date(dominio.criado_em).toLocaleDateString()}
                </CardMeta>
              )}
              <button onClick={() => router.push(`/dominios/itens/${dominio.id}`)} >
                <Icon name="pencil" />
              </button>
              <button onClick={() => router.push(`/dominios/edit/${dominio.id}`)}>
                <Icon name="pencil" />
              </button>
            </CardContent>
          </Card>

        ))}
      </CardGroup>
      <CardGroup itemsPerRow={1}>
        <Card>
          <CardContent style={{ minHeight: "300px" }}>
             
          </CardContent>

        </Card>
      </CardGroup>

    </div>


  );
};
