import { GetServerSideProps } from "next";
import { Button, Grid, GridColumn, GridRow, Item } from "semantic-ui-react";
import { Layout } from "src/components/Layout";
import { BiTaskX } from "react-icons/bi";
import { PostList } from "./posts/post-list.page";

import { Task } from "src/interfaces/Tasks";
import Padrao from "src/components/Padrao";

import { Post } from "src/interfaces/post";
import postsService from "src/services/posts.service";

interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {

  return (
    <Layout titulo="">
    
        <Padrao   msg="Não há categorias cadastradas" retorno="/posts/new" />
   
        <PostList posts={posts} />
   
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await postsService.list()
  console.log(posts)
  return {
    props: { posts: posts },
  };
};

export default Posts;
