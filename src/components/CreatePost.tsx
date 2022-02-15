import { useState } from "react";
import axios from "axios";
import { IPost } from "@libs/types";
// import { mutate } from "swr";

const CreatePost = ({ mutate }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = Math.floor(Math.random() * 1000);

    const FAKE_DATA = {
      id,
      content,
      createdAt: Date.now(),
      clientOnly: true,
    };

    mutate(
      (posts: IPost[]) => [FAKE_DATA, ...posts],
      false
    );

    setContent("");
    await axios({
      method: "post",
      url: "/posts",
      data: {
        content,
        id,
        createdAt: Date.now(),
      },
    });
    // setPosts(posts => [data, ...posts])
    mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-50 ">
      <textarea
        cols={3}
        className="form-control"
        placeholder="Write your dream post:)"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <button className="btn btn-outline-warning" type="submit">
        Add Post
      </button>
    </form>
  );
};

export default CreatePost;
