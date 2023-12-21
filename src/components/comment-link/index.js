import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const CommentLink = () => {
  return (
    <span>
      <Link to="/login" className="link">Войдите</Link>
      <p>, чтобы иметь возможность комментировать</p>
    </span>
  );
};

export default memo(CommentLink);