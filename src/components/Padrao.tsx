import { Button, Grid, GridColumn, GridRow, Item } from "semantic-ui-react";
import { BiTaskX } from "react-icons/bi";
import { useRouter } from "next/router";

interface Props {
    titulo?: string;
    msg: string;
    retorno: string;
  }

export const Padrao = ({titulo,  msg, retorno}: Props) => {
    const { push, back } = useRouter();

    return (
        <Grid
            columns={16}
             
            verticalAlign="middle"
            style={{ height: "70%" }
            }
        >
            <h1> {titulo}</h1>
            <GridRow>
                <GridColumn>
                    <div style={{  textAlign: "left" }}>
                    
                        <Button onClick={() => push(retorno)}>Novo</Button>
                    </div>
                </GridColumn>
            </GridRow>
        </Grid >
  
    )
}
 
export default Padrao