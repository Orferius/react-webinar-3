import { memo } from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import "./style.css";

const ItemProduct = (props) => {

  const cn = bem('Product');

  const callbacks = {
    onAdd: () => props.onAdd(props.data._id)
  }

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.data?.description}</p>
      <p className={cn('country')}>Страна производитель: <strong>{props.data?.country?.title} ({props.data?.country?.code})</strong></p>
      <p className={cn('category')}>Категория: <strong>{props.data?.category?.title}</strong></p>
      <p className={cn('year')}>Год выпуска: <strong>{props.data?.year}</strong></p>
      <p className={cn('price')}>Цена: {numberFormat(props.data?.price)}</p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
};

ItemProduct.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    country: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    year: PropTypes.number,
    price: PropTypes.number,
  }),
  onAdd: PropTypes.func,
};

ItemProduct.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemProduct);
