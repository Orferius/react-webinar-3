import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import formatDateTime from "../../utils/date-format";
import CommentForm from "../comment-form";
import "./style.css";

const CommentCard = (props) => {
  const cn = bem("Comment");
  const css = { marginLeft: `${props.comment.level * 30}px` };

  return (
    <div className={cn()} style={css}>
      <div className={cn("info")}>
        <div className={cn("author")}>{props.comment.author?.profile?.name}</div>
        <div className={cn("date")}>{formatDateTime(props.comment.dateCreate)}</div>
      </div>
      <div className={cn("text")}>{props.comment.text}</div>
      <button className={cn("btn")} onClick={() => props.onReply(props.comment._id)}>Ответить</button>
      {props.replying && (
        <CommentForm
          exists={props.exists}
          onCancel={props.onCancel}
          onSubmit={props.onSubmit}
          onChange={props.onChange}
        />
      )}
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    dateCreate: PropTypes.string,
    level: PropTypes.number,
    text: PropTypes.string,
  }),
  onReply: PropTypes.func,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  exists: PropTypes.bool,
  replying: PropTypes.bool,
};

CommentCard.defaultProps = {
  onReply: () => {},
  onCancel: () => {},
  onSubmit: () => {},
  onChange: () => {},
};

export default memo(CommentCard);