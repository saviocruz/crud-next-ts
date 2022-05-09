import { useRouter } from "next/router";
import { useState } from "react";
import { Button,Confirm, Container, Grid, GridColumn, GridRow, Icon, } from "semantic-ui-react";
import { estadoInicialMetadado, Metadado } from "src/interfaces/interfaces";


interface Props {
  metadados: Metadado[];
}

export const MetadadoList = ({ metadados = [] }: Props) => {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [metadado, setMetadado] = useState<Metadado>(estadoInicialMetadado)

  const handleDelete = async (id: string) => {
    if (id !== "") {
      try {
        const res = await fetch("http://localhost:5000/metadados/" + id, {
          method: "DELETE",
        });
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Container style={{ padding: "1rem", color: "black", backgroundColor: "white", borderRadius: "10px", width: "70%", }}>
        <h2>  Metadados do Dominio</h2>

        <Grid
          columns={5}
          verticalAlign="middle"
          style={{ margin: "5px", border: "0px solid #c0c0c0", borderRadius: "10px", }}>
          <GridRow columns={5} style={{ backgroundColor: "#c0c0c0", margin: "5px", border: "1px solid #c0c0c0", borderRadius: "5px", }}>
            <GridColumn width={3} >
              <label>Nome campo</label>
            </GridColumn >
            <GridColumn  width={2} >
              <label>Legenda</label>
            </GridColumn>
            <GridColumn  width={2} >
              <label>Tipo</label>
            </GridColumn>
            <GridColumn width={2} >
              <label>Ordem</label>
            </GridColumn>
            <GridColumn width={2} >
              <label title="Obrigatório">Obrig </label>
            </GridColumn>
            <GridColumn width={2} >
              <label>Ativo</label>
            </GridColumn>
            <GridColumn width={3} >
              <label>Opções</label>
            </GridColumn>
          </GridRow>

          {metadados.map((metadado) => (
            <GridRow style={{ borderBottom: "1px solid #c0c0c0", padding: "4px" }}  key={metadado.id}>
              <GridColumn width={3} >
                {metadado.nome}
              </GridColumn>
              <GridColumn width={2} >
                {metadado.legenda}
              </GridColumn>
              <GridColumn width={2} >
                {metadado.tipo}
              </GridColumn>
              <GridColumn width={2} >
                {metadado.ordem}
              </GridColumn>
              <GridColumn width={2} >
                {metadado.obrigatorio}
              </GridColumn>
              <GridColumn width={2} >
                {metadado.ativo}
              </GridColumn>
              <GridColumn width={3} >
                <Button  primary style={{ padding: "8px", marginRight: "4px"}} onClick={() => { router.push('/metadados/edit/' +  metadado.id  ) }                                      } >
                  <Icon name="pencil" style={{ margin: "auto"}} /> 
                </Button>
                <Button inverted color="red" 
                          style={{ padding: "8px" }}
                          onClick={() => {
                          setMetadado(metadado)
                          setOpenConfirm(true) }} >
                  <i aria-hidden="true" className="trash icon" style={{ margin: "auto"}}/>
                </Button>
              </GridColumn>
            </GridRow>

          ))}
        </Grid>

        <Confirm
          header="Remover item?"
          content={`Você tem certeza que deseja remover ${metadado.nome}`}
          open={openConfirm}
          onCancel={() => setOpenConfirm(false)}
          onConfirm={() => typeof router.query.id === "string" && handleDelete(router.query.id)} />
      </Container>



    </div>


  );
};
