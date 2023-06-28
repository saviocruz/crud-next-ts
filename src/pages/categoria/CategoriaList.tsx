import { useRouter } from "next/router";
import { Card, CardContent, CardDescription, CardGroup, CardHeader, CardMeta, } from "semantic-ui-react";

import { Categoria } from "src/interfaces/interfaces";

interface Props {
  categorias: Categoria[];
}

export const CategoriaList = ({ categorias = [] }: Props) => {
  const router = useRouter();

  return (
  
      <CardGroup itemsPerRow={4}> 
      {categorias.map((categoria) => (
        <Card
          onClick={() => router.push(`/categorias/edit/${categoria.id}`)}
          key={categoria.id}
        >
          <CardContent>
            <CardHeader>{categoria.nome}</ CardHeader>
            {categoria.criado_em && (
              <CardMeta>
                {new Date(categoria.criado_em).toLocaleDateString()}
              </CardMeta>
            )}
            <CardDescription>{categoria.sigla}</CardDescription>
            <CardDescription> {categoria.categoria?.nome}</ CardDescription>

          </CardContent>
        </Card>
      ))}
      </CardGroup>
     
  );
};
