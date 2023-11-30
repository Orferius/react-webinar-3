import React from "react";
import PropTypes from "prop-types";
import priceFormatter from "./../../utils";
import './style.css';

function Item(props) {
  const callbacks = {
    addToCart: () => {
      props.addToCart(props.item);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} 
      </div>
      <div className="Item-price">
        {priceFormatter(props.item.price)}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.addToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  addToCart: PropTypes.func,
};

Item.defaultProps = {
  addToCart: () => {
  },
}

export default React.memo(Item);
