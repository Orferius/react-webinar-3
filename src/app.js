import React, {useCallback, useState} from 'react';
import priceFormatter from "./utils.js";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal/index.js";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const [isModalOpen, setModalOpen] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    toggleModal: useCallback(() => {
      setModalOpen(!isModalOpen);
    }, [isModalOpen]),

    onAddItem: useCallback((product) => {
      store.addItem(product);
    }, [store]),
  };

  const sumTotal = ((cart) => {
    if (quantity === 0) {
      return 0;
    }
    const totalCost = cart.reduce((acc, item) => {
      const itemCost = item.price * item.count;
      return acc + itemCost;
    }, 0)
    return totalCost;
  })

  const totalSum = priceFormatter(sumTotal(cart));
  const quantity = cart.length;

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls
        quantity={quantity}
        totalSum={totalSum}
        toggleModal={callbacks.toggleModal}
      />
      <List list={list} onClick={callbacks.onAddItem}/>
      {isModalOpen && (
        <Modal
          quantity={quantity}
          totalSum={totalSum}
          headProps={{ title: 'Корзина', isModalOpen: isModalOpen, toggleModal: callbacks.toggleModal }}
          listProps={{ list: cart, isModalOpen: isModalOpen, onClick: callbacks.onDeleteItem }}
        />
      )}
    </PageLayout>
  );
}

export default App;
