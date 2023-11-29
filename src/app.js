import React, { useCallback, useEffect, useState } from "react";
import CartSummary from "./components/cartSummary";
import Head from "./components/head";
import List from "./components/list";
import Modal from "./components/modal";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityOfGoods, setQuantityOfGoods] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const { list = [], cart = [] } = store.getState();

  useEffect(() => {
    const sum = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    setFinalPrice(sum);
    setQuantityOfGoods(cart.length);
  }, [cart]);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (productId) => {
        store.addItem(productId);
      },
      [store]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <CartSummary
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          quantityOfGoods={quantityOfGoods}
          finalPrice={finalPrice}
        />
        <List list={list} action={callbacks.onAddItem} />
      </PageLayout>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        cart={cart}
        action={callbacks.onDeleteItem}
        finalPrice={finalPrice}
      />
    </>
  );
}

export default App;
