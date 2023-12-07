import { memo } from "react";
import PropTypes from "prop-types";
import useSelector from "../../store/use-selector";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import "./style.css";

const ItemProduct = (props) => {

  const cn = bem('Product');

  const select = useSelector((state) => ({
    data: state.product.data,
  }));

  const callbacks = {
    onAdd: () => props.onAdd(select.data._id)
  }

  return (
    <div className={cn()}>
      <p className={cn('description')}>{select.data?.description}</p>
      <p className={cn('country')}>Страна производитель: <strong>{select.data?.country?.title} ({select.data?.country?.code})</strong></p>
      <p className={cn('category')}>Категория: <strong>{select.data?.category?.title}</strong></p>
      <p className={cn('year')}>Год выпуска: <strong>{select.data?.year}</strong></p>
      <p className={cn('price')}>Цена: {numberFormat(select.data?.price)}</p>
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
