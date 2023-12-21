import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import formatDateTime from "../../utils/date-format";
import CommentForm from "../comment-form";
import "./style.css";

const CommentCard = ({ comment, onReply, exists, replying }) => {

  const cn = bem("Comment");
  const css = { marginLeft: `${comment.level * 30}px` };

  return (
    <div className={cn()} style={css}>
      <div className={cn("info")}>
        <div className={cn("author")}>{comment.author?.profile?.name}</div>
        <div className={cn("date")}>{formatDateTime(comment.dateCreate)}</div>
      </div>
      <div className={cn("text")}>{comment.text}</div>
      <button className={cn('btn')} onClick={() => onReply(comment._id)}>Ответить</button>
      {replying && <CommentForm exists={exists}/>}
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
  exists: PropTypes.bool,
  replying: PropTypes.bool
};

CommentCard.defaultProps = {
  onReply: () => {},
}

export default memo(CommentCard);