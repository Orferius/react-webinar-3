import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import './style.css';

function Head(props) {
  const callbacks = {
    onClick: props.toggleModal,
  };

  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      {props.isModalOpen && <Button title='Закрыть' onClick={callbacks.onClick}/>}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  isModalOpen:PropTypes.bool,
  toggleModal: PropTypes.func,
};

Head.defaultProps = {
  toggleModal: () => {},
  isModalOpen: false,
};

export default React.memo(Head);
