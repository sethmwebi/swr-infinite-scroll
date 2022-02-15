import { IPost } from "@libs/types"
import { useRouter } from "next/router";
import { FunctionComponent } from "react"

const PostCard: FunctionComponent<{
  data: IPost
}> = ({data: {content, createdAt, id, clientOnly}}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${id}`);
  };

  const classnames = clientOnly ? "border card w-50 bg-dark" : "card w-50 bg-dark";

  return (
    <div className={classnames} onClick={handleClick}>
      <p className="card-header">Post Id : {id}</p>
      <p className="card-body">{content}</p>
    </div>
  );
};

export default PostCard;
