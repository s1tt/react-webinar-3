import React, { useCallback, useState } from "react";
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
  const { list = [], cart: { goods = [], cartSummary = {} } = {} } =
    store.getState();

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
          cartSummary={cartSummary}
          type="page"
        />
        <List list={list} action={callbacks.onAddItem} />
      </PageLayout>
      <Modal
        modalTitle="Корзина"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        {goods.length ? (
          <>
            <List
              list={goods}
              isModalOpen={isModalOpen}
              action={callbacks.onDeleteItem}
            />
            <CartSummary cartSummary={cartSummary} type="modal" />
          </>
        ) : (
          <h2 className="Modal-empty">Корзина пуста</h2>
        )}
      </Modal>
    </>
  );
}

export default App;
