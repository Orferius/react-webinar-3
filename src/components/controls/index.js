import React from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import Button from "../button";
import './style.css';

function Controls(props) {
  const wordForms = {
    one: "товар",
    few: "товара",
    many: "товаров",
  };

  const callbacks = {
    onClick: props.toggleModal,
  };

  return (
    <div className="Controls">
      <div className="Controls-title">
        {props.quantity
          ? `${props.quantity} ${plural(props.quantity, wordForms)} / ${
              props.totalSum
            } \u20bd`
          : "пусто"}
      </div>
      <Button title='Перейти' onClick={callbacks.onClick}/>
    </div>
  );
}

Controls.propTypes = {
  quantity: PropTypes.number,
  totalSum: PropTypes.string,
  toggleModal: PropTypes.func,
};

Controls.defaultProps = {
  toggleModal: () => {}
};

export default React.memo(Controls);
