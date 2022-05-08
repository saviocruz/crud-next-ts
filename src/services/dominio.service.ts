import { apiDados, apiUrl } from 'config';
import { Dominio, Item, Metadado } from 'src/interfaces/interfaces';
import axios from 'axios'

const baseApi = `${apiUrl}/dominios/`;
const baseDados = `${apiDados}/dominios/`;


export const dominioService = {
  getAll,
  carregaDados,
  carregaMetadados,
  carregaItens,
  novo,
  atualiza,
  delete: _delete
};

async function getAll() {

  const response = await fetch(baseApi);
  const data = await response.json();
  const dominios = data.map((item: Dominio) => item)
  return dominios;
}
interface RangeResult {
  id: number;
  nome: string;
  ativo: string;
  criado_em: string
}

async function carregaDados(id: string) {

  if (id !== null) {
    const response = await fetch(baseApi + id);
    const dominio = await response.json();
    return dominio

  }
}

async function carregaMetadados(id: string) {

  if (id !== null) {
    const re2 = await fetch("http://localhost:5000/metadados/");
    const d1 = await re2.json();
    const itens = d1.map((iten: Item) => iten)

    return itens
  }
}


async function carregaItens(id: string) {

  if (id !== null) {
    const re2 = await fetch("http://localhost:5000/itens/");
    const d1 = await re2.json();
    const itens = d1.map((iten: Item) => iten)

    return itens
  }
}


async function novo(dominio: Dominio) {

  await fetch(baseApi, {
    method: "POST",
    body: JSON.stringify(dominio),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function atualiza(dominio: Dominio) {
  await fetch(baseApi + dominio.id, {
    method: "PATCH",
    body: JSON.stringify(dominio),
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

/*
      Accept: "application/json",

'Authorization': '',
      '_method': 'PATCH',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"


      */