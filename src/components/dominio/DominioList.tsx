import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Card, CardContent, CardGroup, CardHeader, CardMeta, Icon, } from "semantic-ui-react";

import { Dominio } from "src/interfaces/interfaces";

interface Props {
  dominios: Dominio[];
}

export const DominioList = ({ dominios = [] }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div>
      <Button primary style={{ padding: "8px" }} onClick={() => router.push(`/dominios/formDominio `)} loading={loading}>
        <Icon name="bullseye" style={{ margin: "auto" }} /> Novo
      </Button>
      <br/> <br/> 
      <CardGroup >
        {dominios.map((dominio) => (
          <Card
            key={dominio.id}>
            <CardContent>
              <CardHeader> {dominio.nome}</ CardHeader>
              <br />
              <Button primary style={{ padding: "8px" }} onClick={() => router.push(`/dominios/itens/${dominio.id}`)} loading={loading}>
                <Icon name="content" style={{ margin: "auto" }} />
              </Button>
              <Button primary style={{ padding: "8px" }} onClick={() => router.push(`/dominios/edit/${dominio.id}`)}>
                <Icon name="configure" style={{ margin: "auto" }} />
              </Button>
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
