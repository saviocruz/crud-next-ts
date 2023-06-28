import axios from 'axios';
import { Post } from 'src/interfaces/post';

// Armazenando o endereço da API
const apiUrl = "http://localhost:8000/api"
const baseApi = `${apiUrl}/posts`;

const postsService = {

    // Função para listar os posts 
    async list(){
        const response = await fetch(baseApi);
        const res = await response.json();
        console.log(res.data)
        const dominios = res.data.map((item: Post) => item)
        return dominios;

        console.log("enpoint")
        const enpoint = baseApi
        console.log(enpoint)
        let ret =  axios.get(enpoint)
        console.log(ret)
        return ret
    },

    // Função para recuperar dados de um post específico
    async getOne(postId: number ){
        const enpoint = apiUrl + "/posts/" + postId
        return axios.get(enpoint)
    },

    // Função para criar um novo post
    async create(data: any){
        const enpoint = apiUrl + "/posts"
        return axios.post(enpoint, data)
    },

    // Função para editar um post específico
    async edit(data: Post, postId: number){
        const enpoint = apiUrl + "/posts/" + postId
        return axios.put(enpoint, data)
    },

    // Função para exluir um post específico
    async delete(postId: number){
        const enpoint = apiUrl + "/posts/" + postId
        return axios.delete(enpoint)
    },


}

export default postsService;