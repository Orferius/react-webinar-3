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
          replyingState={props.replyingState}
          exists={props.exists}
          onCancel={props.onCancel}
          onChange={props.onChange}
          onSubmit={props.onSubmit}
          userName={props.userName}
          location={props.location}
          title={props.title}
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
    id: PropTypes.string,
    type: PropTypes.string,
  }),
  userName: PropTypes.string,
  exists: PropTypes.bool,
  onReply: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  location: PropTypes.string,
  title: PropTypes.string,
};

CommentList.defaultProps = {
  onReply: () => {},
  onCancel: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

export default memo(CommentList);