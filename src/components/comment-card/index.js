import { memo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import formatDateTime from "../../utils/date-format";
import CommentForm from "../comment-form";
import "./style.css";

const CommentCard = (props) => {
  const cn = bem("Comment");
  const level = props.comment.level;
  const maxLevel = 15;
  const margin = level > 0 ? 30 : 0;
  const marginStyle = { marginLeft: `${level <= maxLevel ? margin : 0}px` };

  const isAuthorAuthorized = props.userName === props.comment.author?.profile?.name;
  const authorStyleColor = isAuthorAuthorized ? cn("author", "active") : cn("author");

  const formRef = useRef(null);

  const scrollToCommentForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (props.replyingState?.id === props.comment._id) {
      scrollToCommentForm();
    }
  }, [props.replyingState, props.comment._id]);

  return (
    <div className={cn()} style={marginStyle}>
      <div className={cn("info")}>
        <div className={authorStyleColor}>{props.comment.author?.profile?.name}</div>
        <div className={cn("date")}>{formatDateTime(props.comment.dateCreate)}</div>
      </div>
      <div className={cn("text")}>{props.comment.text}</div>
      <button
        className={cn("btn")}
        onClick={() => {
          props.onReply(props.comment._id);
          scrollToCommentForm();
        }}
      >
        Ответить
      </button>

      {props.comment.children?.length > 0 && (
        <div className={cn("children")}>
          {props.comment.children.map((child) => (
            <CommentCard
              key={child._id}
              comment={child}
              onReply={props.onReply}
              replyingState={props.replyingState}
              exists={props.exists}
              onCancel={props.onCancel}
              onSubmit={props.onSubmit}
              onChange={props.onChange}
              location={props.location}
              title={props.title}
              userName={props.userName}
            />
          ))}
        </div>
      )}

      {props.replyingState?.id === props.comment._id && (
        <div className={cn("form")} ref={formRef}>
          <CommentForm
            exists={props.exists}
            onCancel={props.onCancel}
            onSubmit={props.onSubmit}
            onChange={props.onChange}
            location={props.location}
            title={props.title}
          />
        </div>
      )}
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    level: PropTypes.number,
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
  userName: PropTypes.string,
  onReply: PropTypes.func,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  location: PropTypes.string,
  replyingState: PropTypes.shape({
    id: PropTypes.string,
  }),
  exists: PropTypes.bool,
  title: PropTypes.string,
};

CommentCard.defaultProps = {
  onReply: () => {},
  onCancel: () => {},
  onSubmit: () => {},
  onChange: () => {},
};

export default memo(CommentCard);