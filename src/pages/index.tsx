import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CreatePost from "@components/CreatePost";
import Loader from "@components/Loader";
import PostCard from "@components/PostCard";
import axios from "axios";
import { IPost } from "@libs/types";
import { usePagination } from "@libs/hooks";

export default function Home({ posts }) {
  // const [posts, setPosts] = useState<IPost>(null)
  // const getPosts = async () => {
  //   const {data} = await axios.get("/posts?_sort=createdAt&_order=desc")
  //   setPosts(data)
  // };

  // useEffect(() => {
  //   getPosts()
  // },[])

  // const {data: posts, error, mutate} = useSWR<IPost[]>("/posts?_sort=createdAt&_order=desc")

  const {
    loadingMore,
    isReachedEnd,
    error,
    paginatedData: paginatedPosts,
    size,
    setSize,
    mutate
  } = usePagination<IPost>("/posts?_sort=createdAt&_order=desc", {
    initialData: posts.length === 0 ? null : posts
  });

  return (
    <div>
      <h4>useSWR Hook ⛳</h4>
      <CreatePost mutate={mutate}/>

      <h4>Posts</h4>
      {error && <p>something is wrong!!!</p>}

      <InfiniteScroll
        next={() => setSize(size + 1)}
        hasMore={!isReachedEnd}
        loader={<Loader />}
        endMessage={<p>Reached the end</p>}
        dataLength={paginatedPosts?.length ?? 0}
      >
        {paginatedPosts?.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export async function getServerSideProps(context){
  let posts: IPost[]

  try {
    const {data} = await axios.get("http://localhost:3002/posts?_sort=createdAt&_order=desc&_page=0&_limit=5")
    posts = data;
  } catch(err){
    posts = []
  }

  console.log(posts)
  return {
    props: {
      posts
    }
  }
}
