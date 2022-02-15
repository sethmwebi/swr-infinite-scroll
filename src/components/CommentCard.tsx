import { FunctionComponent } from "react";
import { IComment } from "@libs/types";

const CommentCard: FunctionComponent<{
  data: IComment;
}> = ({ data }) => {

  const classnames = data.clientOnly ? "border card w-50 bg-dark" : "card w-50 bg-dark";
  return (
    <div className={classnames}>
      <p className="card-body">{data.content}</p>
    </div>
  );
};

export default CommentCard;
