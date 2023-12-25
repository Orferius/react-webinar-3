import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

const CommentLink = ({articleArea, onCancel, location}) => {
  const cn = bem("CommentLink");

  const word = articleArea ? 'комментировать' : 'ответить. ';
  const btn = articleArea ? null : <button className={cn('cancelBtn')} onClick={onCancel}>Отмена</button>;

  return (
    <div>
      <Link to="/login" className={cn("link")} state={{ back: location }}>Войдите</Link>
      <p className={cn("text")}>, чтобы иметь возможность {word}</p>
      {btn}
    </div>
  );
};

CommentLink.propTypes = {
  articleArea: PropTypes.bool,
  onCancel: PropTypes.func,
};

CommentLink.defaultProps = {
  onCancel: () => {},
};

export default memo(CommentLink);