import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Button = (props) => {
  const callbacks = {
    onClick: props.onClick,
  };

  return (
    <div className="Button-container">
      <button className="Button" onClick={callbacks.onClick}>
        {props.title}
      </button>
    </div>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
