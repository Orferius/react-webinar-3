import { memo } from "react";
import PropTypes from 'prop-types';
import "./style.css";

const CommentHeader = ({count}) => {
  return (
    <h2 className="header">Комментарии ({count})</h2>
  );
};

CommentHeader.propTypes = {
  count: PropTypes.number
}

export default memo(CommentHeader);