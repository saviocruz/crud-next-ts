import { apiDados, apiUrl } from 'config';
import { Task} from 'src/interfaces/Tasks';
import axios from 'axios'

const baseApi = `${apiUrl}/tasks/`;


export const taskService = {
  getAll,
  carregaDados,
  novo,
  atualiza,
  
  delete: _delete
};

async function getAll() {

  const response = await fetch(baseApi);
  const data = await response.json();
  const dominios = data.map((item: Task) => item)
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

async function novo(dominio: Task) {

  await fetch(baseApi, {
    method: "POST",
    body: JSON.stringify(dominio),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function atualiza(dominio: Task) {
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
    axios.delete(baseApi+ id)
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