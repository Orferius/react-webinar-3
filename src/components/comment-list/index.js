import { memo } from "react";
import PropTypes from "prop-types";
import CommentCard from "../comment-card";

const CommentList = (props) => {
  return (
    <div>
      {props.comments.map((item) => (
        <CommentCard
          key={item._id}
          comment={item}
          onReply={props.onReply}
          replying={props.replyingState.id === item._id}
          exists={props.exists}
          onCancel={props.onCancel}
          onChange={props.onChange}
          onSubmit={props.onSubmit}
        />
      ))}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string
  })).isRequired,
  replyingState: PropTypes.shape({
    id: PropTypes.string
  }),
  exists: PropTypes.bool,
  onReply: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

CommentList.defaultProps = {
  onReply: () => {},
  onCancel: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

export default memo(CommentList);