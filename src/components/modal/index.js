import React from "react";
import PropTypes from "prop-types";
import priceFormatter from "../../utils";
import "./style.css";

const Modal = ({ cart, closeModal, deleteFromCart, sumTotal }) => {
  const callbacks = {
    deleteFromCart: (code) => {
      deleteFromCart(code);
    },
  };
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="Head head-container">
          <h1>Корзина</h1>
          <div className="button-container">
            <button className="Controls-button" onClick={() => closeModal()}>
              Закрыть
            </button>
          </div>
        </div>
        <div className="emptyCart">
          {cart.length > 0
            ? ""
            : "Вы пока не добавили ни одного товара в корзину"}
        </div>
        <div className="List">
          {cart.map((item) => (
            <div key={item.code} className="List-item">
              <div className="Item">
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>
                <div className="Item-price">{priceFormatter(item.price)}</div>
                <div className="Item-quantity">{item.count}</div>
                <div className="Item-actions">
                  <button onClick={() => callbacks.deleteFromCart(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 ? (
          <div className="total">
            <div>Итого </div>
            <div className="total_sum">{priceFormatter(sumTotal(cart))}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

Modal.propTypes = {
  openModal: PropTypes.func,
  deleteFromCart: PropTypes.func,
  sumTotal: PropTypes.func,
};

Modal.defaultProps = {
  openModal: () => {},
  deleteFromCart: () => {},
  sumTotal: () => {},
};

export default React.memo(Modal);
