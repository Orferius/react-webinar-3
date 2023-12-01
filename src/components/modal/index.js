import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import List from "../list";
import "./style.css";

const Modal = (props) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <Head {...props.headProps} />
        <div className="emptyCart">
          {props.quantity > 0
            ? ""
            : "Вы пока не добавили ни одного товара в корзину"}
        </div>
        <List {...props.listProps} />
        {props.quantity > 0 && (
          <div className="total">
            <span>Итого </span>
            <span className="total_sum">{props.totalSum}</span>
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  quantity: PropTypes.number,
  totalSum: PropTypes.string,
};

export default React.memo(Modal);
