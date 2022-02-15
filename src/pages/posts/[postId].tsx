import CreateComment from "@components/CreateComment";
import CommentCard from "@components/CommentCard";
import PostCard from "@components/PostCard";
import Loader from "@components/Loader";
import { usePagination } from "@types/hooks"
import axios from "axios";
import { useState, useEffect } from "react";
import { IComment, IPost } from "@libs/types";
import { useRouter } from "next/router";
import useSWR from "swr";

const index = () => {
  const {
    query: { postId },
  } = useRouter();
  // const [comments, setComments] = useState<IComment[]>(null)
  // const [post, setPost] = useState<IPost>(null)

  // const getPost = async () => {
  //   const { data } = await axios(`/posts/${postId}?_sort=createdAt&_order=desc`)
  //   setPost(data)
  // };

  // const getComments = async () => {
  //   const { data } = await axios(`/posts/${postId}/comments?_sort=createdAt&_order=desc`)
  //   setComments(data)
  // };

  // useEffect(() => {
  //   postId && getComments()
  //   postId && getPost()
  // },[postId])

  // const {data: comments, error} = useSWR<IComment[]>(`/posts/${postId}/comments?_sort=createdAt&_order=desc`)

  const {
    loadingMore,
    isReachedEnd,
    error,
    paginatedData: paginatedComments,
    size,
    setSize,
  } = usePagination<IComment>(
    "/posts/${postId}/comments?_sort=createdAt&_order=desc"
  );

  const { data: posts, error: postError } = useSWR<IPost[]>(
    `/posts?_sort=createdAt&_order=desc`,
    {
      dedupingInterval: 10000,
    }
  );
  const postIndex = posts?.findIndex((post) => post.id === Number(postId));

  return (
    <div>
      {!posts && <Loader />}
      {posts && <PostCard data={posts[postIndex]} />}
      <CreateComment postId={postId} />

      <h4>Comments</h4>

      {!paginatedComments && <Loader />}

      {paginatedComments?.map((comment) => (
        <CommentCard key={comment.id} data={comment} />
      ))}

      {loadingMore && <Loader />}
      
      {!isReachedEnd && <button onClick={() => setSize(size + 1)}>Load More</button>}
    </div>
  );
};

export default index;
