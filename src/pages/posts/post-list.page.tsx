import { GetServerSideProps } from "next";
import PageTop from '../../components/page-top/page-top.component';
import postsService from '../../services/posts.service';
//import estilo from './post-list.page.css';
import { Post, postInit } from 'src/interfaces/post';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Layout } from "src/components/Layout";
import Padrao from "src/components/Padrao";
import { useEffect, useState } from "react";

interface Props {
    posts: Post[];
}

export  const PostList = ( { posts = [] }: Props) => {
    const history = useRouter();
  //  const [posts, setPosts] = useState([])

    // Função responsável por chamar o serviço e carregar os posts.
    /*
    useEffect(() => {
        loadPosts();
      }, [])
      
    async function loadPosts() {
        try {
            let res = await postsService.list()
            console.log(res)
            setPosts(res.data.data)
          //  this.setState({ posts: res.data.data })
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar os posts.")
        }
    }
*/
    return (
     
 
        <div >

            <PageTop titulo={"Posts"} desc={"Listagem dos posts"}>
                <button className="btn btn-primary" onClick={() => history.push("/post-add")}>
                    Adicionar
                </button>
            </PageTop>

            {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
            {posts.map((post: any) => (
                <Link href={"/post-detail/" + post.id} key={post.id}>
                    <div className="post-card">
                        <div className="post-card__img">
                            <img src={post.imageUrl} />
                        </div>
                        <div className="post-card__text">
                            <h4>{post.title}</h4>
                            <p>{post.content}</p>
                        </div>
                    </div>
                </Link>
            ))}

        </div>
        
        
    )
}
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log("getServerSideProps")
    const posts = await postsService.list()
    console.log(posts)
    return {
        props: { posts: posts },
    };
};
*/
export default PostList;