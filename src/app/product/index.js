import { memo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ItemProduct from "../../components/item-product";
import Menu from "../../components/menu";

const Product = () => {
  const store = useStore();
  const { id } = useParams();

  useEffect(() => {
    store.actions.product.loadItem(id);
  }, [id]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    data: state.product.data,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.data?.title} />
      <Menu
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemProduct onAdd={callbacks.addToBasket} data={select.data} />
    </PageLayout>
  );
};

export default memo(Product);