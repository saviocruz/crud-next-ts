import { apiDados, apiUrl } from 'config';
import {  Item } from 'src/interfaces/interfaces';
import axios from 'axios'

const baseApi = `${apiUrl}/itens/`;
const baseDados = `${apiDados}/itens/`;


export const itemService = {
  getAll,
  carregaDados,
  novo,
  atualiza,
  delete: _delete
};

async function getAll() {

  const response = await fetch(baseApi);
  const data = await response.json();
  const itens = data.map((item: Item) => item)
  return itens;
}
 

async function carregaDados(id: string) {

  if (id !== null) {
    const response = await fetch(baseDados + "?id_dominio=" + id);
    const item  = await response.json();
    return item
  }
}

  

async function novo(item  : Item) {

  await fetch(baseApi, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function atualiza(item  : Item
  ) {
  await fetch(baseApi + item.id, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id: string) {
  if (id !== "") {
    axios.delete(baseDados+ id)
    .then( (resp: any) => {
        console.log(resp.data)
    }).catch( (error: any) => {
        console.log(error);
    });

  }
};
 