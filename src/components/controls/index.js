import React from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import priceFormatter from "./../../utils";
import './style.css';

function Controls({ cart, openModal, sumTotal }) {
  const totalSum = priceFormatter(sumTotal(cart));
  return (
    <div className="Controls">
      <div className="Controls-title">
        {cart.length
          ? `${cart.length} ${plural(cart.length, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${totalSum}`
          : "пусто"}
      </div>
      <button className="Controls-button" onClick={() => openModal()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openModal: PropTypes.func,
  sumTotal: PropTypes.func,
};

Controls.defaultProps = {
  openModal: () => {},
  sumTotal: () => {},
};

export default React.memo(Controls);
