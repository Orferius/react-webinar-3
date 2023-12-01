import React from "react";
import PropTypes from "prop-types";
import priceFormatter from "./../../utils";
import './style.css';
import Button from "../button";

function Item(props) {
  const callbacks = {
    onClick: () => {
      props.onClick(props.item);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{priceFormatter(props.item.price)}</div>
      {props.isModalOpen && (
        <div className="Item-quantity">{props.item.count}</div>
      )}
      <div className="Item-actions">
        <Button
          title={props.isModalOpen ? "Удалить" : "Добавить"}
          onClick={callbacks.onClick}
        />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  isModalOpen: PropTypes.bool,
};

Item.defaultProps = {
  onClick: () => {},
  isModalOpen: false,
};

export default React.memo(Item);
