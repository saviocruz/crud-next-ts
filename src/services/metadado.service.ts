import { apiDados, apiUrl } from 'config';
import {  Metadado } from 'src/interfaces/interfaces';
import axios from 'axios'

const baseApi = `${apiUrl}/metadados/`;
//const baseDados = `${apiDados}/metadados/`;


export const metadadoService = {
  getAll,
  carregaMetadadoDominio,
  carregaDados,
  carregaMetadados,
  novo,
  atualiza,
  delete: _delete
};

async function getAll() {

  const response = await fetch(baseApi);
  const data = await response.json();
  const metadados = data.map((item: Metadado) => item)
  return metadados;
}
 
async function carregaMetadadoDominio(id_dominio: string) {

  if (id_dominio !== null) {
    console.log(baseApi + "dominio/" +id_dominio)
    const response = await fetch(baseApi + "dominio/" +id_dominio);
    const metadado   = await response.json();
    return metadado
  }
}


async function carregaMetadados(id: string) {

  if (id !== null) {
    const re2 = await fetch(baseApi );
    const d1 = await re2.json();
    const itens = d1.map((iten: Metadado) => iten)

    return itens
  }
}



async function carregaDados(id: string) {

  if (id !== null) {
    const response = await fetch(baseApi + id);
    const metadado   = await response.json();
    return metadado
  }
}

  

async function novo(metadado  : Metadado) {

  await fetch(baseApi, {
    method: "POST",
    body: JSON.stringify(metadado
      ),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function atualiza(metadado  : Metadado
  ) {
  await fetch(baseApi + metadado.id, {
    method: "PATCH",
    body: JSON.stringify(metadado
      ),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id: string) {
  if (id !== "") {
    axios.delete(baseApi+ id)
    .then( (resp: any) => {
        console.log(resp.data)
    }).catch( (error: any) => {
        console.log(error);
    });

  }
};
 