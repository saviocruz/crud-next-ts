import { apiUrl } from 'config';
import { Dominio, Item } from 'src/interfaces/interfaces';

export const dominioService = {
  getAll,
  carregaDados,
  novo,
  atualiza,
  delete: _delete
};

const baseUrl = `${apiUrl}/users`;

async function getAll() {

  const res = await fetch("http://localhost:3000/api/dominios");
  const data = await res.json();
  const dominios = data.map((item: Dominio) => item)

  return dominios;
}

async function carregaDados(id: string) {

  if (id !== null) {
    const response = await fetch("http://localhost:3000/api/dominios/" + id);
    const dominio = await response.json();

    if (dominio !== null) {
      const re1 = await fetch("http://localhost:5000/metadados/");
      const metadados = await re1.json();


      const re2 = await fetch("http://localhost:5000/itens/");
      const d1 = await re2.json();
      const itens = d1.map((iten: Item) => iten)

      return [dominio, metadados, itens]
    }
  }


   
}

async function novo(dominio: Dominio) {

  await fetch("http://localhost:5000/dominios", {
    method: "POST",
    body: JSON.stringify(dominio),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function atualiza(dominio: Dominio) {

  await fetch("http://localhost:5000/dominios", {
    method: "PATCH",
    body: JSON.stringify(dominio),
    headers: {
      "Content-Type": "application/json",
    },
  });
}




// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: string) {
  if (id !== "") {
    try {
      const res = fetch("http://localhost:3000/api/dominios/" + id, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }

  }
};
