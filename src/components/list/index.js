import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props) {
  const callbacks = {
    onClick: props.onClick,
  };

  return (
    <div className='List'>
      {props.list.map(item => (
        <div key={item.code} className='List-item'>
          <Item
            item={item}
            onClick={callbacks.onClick}
            isModalOpen={props.isModalOpen}
          />
        </div>
      ))}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number
    })).isRequired,
  onClick: PropTypes.func,
  isModalOpen: PropTypes.bool,
};

List.defaultProps = {
  onClick: () => {},
  isModalOpen: false,
};

export default React.memo(List);
