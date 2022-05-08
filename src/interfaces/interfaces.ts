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
  nome?: string;
  legenda?: string;
  tipo?: string;
  ordem?: number;
  obrigatorio?: string;
  tamanho?: number;
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
  tamanho: 10,
  informacao: '',
  ativo: 'SIM',
  criado_em: '01/01/2022'
};


export interface Item {
  id: number;
  id_dominio: number;
  nome?: string;
  tipo?: string;
  valor?: number;
  criado_em?: string;
}

export const  estadoInicialItem  = {
  id: 0, 
  id_dominio: 0, 
  nome: '',
  tipo: '',
  valor: 0,
  criado_em: '01/01/2022'
};