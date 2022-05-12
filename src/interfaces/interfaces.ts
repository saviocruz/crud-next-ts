import { SemanticWIDTHS } from "semantic-ui-react";

export interface Categoria {
  id: number;
  nome: string;
  sigla?: string;
  ativo: string;
  categoriaId?: number ;
  restrito?: string;
  criado_em?: string;
  categoria?: Categoria | null
}

export const estadoInicialCategoria = {
  id: 0, 
  nome: '',
  sigla: '',
  ativo: 'SIM',
  categoriaId: 0,  
  restrito: 'NAO',
  criado_em: '01/01/2022',
  categoria: null 
};

export interface Dominio {
  id: number;
  nome: string;
  ativo: string;
  criado_em?: string;
}

export const  estadoInicialDominio  = {
  id: 0, 
  nome: '',
  ativo: 'SIM',
  criado_em: '01/01/2022'
};


export interface Metadado {
  id: number;
  nome: string;
  legenda: string;
  tipo?: string;
  ordem?: number;
  obrigatorio?: string;
  tamanho?: SemanticWIDTHS | number ;
  informacao?: string;
  ativo?: string;
  criado_em?: string;
}


export const  estadoInicialMetadado  = {
  id: 0, 
  nome: '',
  legenda: '',
  tipo: '',
  ordem: 0,
  obrigatorio: '',
  tamanho:  1,
  informacao: '',
  ativo: 'SIM',
  criado_em: '01/01/2022'
};


export interface Item {
  id?: number;
  dominioId: number;
  nome: string;
  descricao?: string;
  informacao?: string;
  ativo:string;
  criado_em: string;
}

export const  estadoInicialItem  = {
  dominioId: 0, 
  nome: '',
  descricao: '',
  informacao: '',
  ativo: 'SIM',
  criado_em: '01/01/2022'
};

export interface ItemValor {
  id: number;
  itemId: number;
  nome: string;
  tipo_form?: string;
  valor?: string;
  metadadoId:number;
  criado_em?: string;
  metadado?: Metadado ;
}

export const  estadoInicialItemValor  = {
  id: 0, 
  itemId: 0, 
  nome: '',
  tipo_form: '',
  valor: '',
  metadadoId: 0, 
  criado_em: '01/01/2022',
  metadado: "" 
};