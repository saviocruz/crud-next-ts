export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  criado_em?: string;
}

export const  postInit  = {
  id: 0, 
  title: '',
  content: '',
  imageUrl: '',
  criado_em: '01/01/2022'
};
