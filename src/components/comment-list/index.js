import { memo } from "react";
import CommentCard from "../comment-card";

const CommentList = ({ comments, onReply, exists, replyingState }) => {
  return (
    <div>
      {comments.map((item) => (
        <CommentCard
          key={item._id}
          comment={item}
          onReply={onReply}
          replying={replyingState.id === item._id}
          exists={exists}
        />
      ))}
    </div>
  );
};

export default memo(CommentList);