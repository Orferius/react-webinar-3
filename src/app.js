import React, {useCallback, useState} from 'react';
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
  const [cart, setCart] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const callbacks = {
    deleteFromCart: useCallback((code) => {
      setCart((prevCart) => prevCart.filter((item) => item.code !== code));
    }),

    openModal: useCallback(() => {
      setModalOpen(true);
    }),

    closeModal: useCallback(() => {
      setModalOpen(false);
    }),

    addToCart: useCallback((product) => {
      const itemInCart = cart.findIndex((item) => item.code === product.code);
      if (itemInCart !== -1) {
        setCart((prevCart) =>
          prevCart.map((item, index) =>
            index === itemInCart ? { ...item, count: item.count + 1 } : item
          )
        );
      } else {
        setCart((prevCart) => [...prevCart, { ...product, count: 1 }]);
      }
    }),

    sumTotal: useCallback((cart) => {
      if (cart.length === 0) {
        return 0;
      }
      const totalCost = cart.reduce((acc, item) => {
        const itemCost = item.price * item.count;
        return acc + itemCost;
      }, 0)
      return totalCost;
    })
  };

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls
        openCart={callbacks.openCart}
        cart={cart}
        openModal={callbacks.openModal}
        sumTotal={callbacks.sumTotal}
      />
      <List list={list} 
            addToCart={callbacks.addToCart}/>
      {isModalOpen && (
        <Modal
          cart={cart}
          closeModal={callbacks.closeModal}
          deleteFromCart={callbacks.deleteFromCart}
          sumTotal={callbacks.sumTotal}
        />
      )}
    </PageLayout>
  );
}

export default App;
