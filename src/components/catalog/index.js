import React, { useCallback } from "react";
import Pagination from "../../pagination";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import Item from "../item";
import List from "../list";

const Catalog = () => {
  const store = useStore();
  const select = useSelector((state) => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    totalItems: state.catalog.totalItems,
  }));

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),

    onPageChange: useCallback(
      (e, page) => {
        if (!e.target.classList.contains("selected")) {
          const currentSkip = page * 10 - 10;
          store.actions.catalog.load(currentSkip, page);
        }
      },
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.currentPage}
        totalItems={select.totalItems}
        onPageChange={callbacks.onPageChange}
      />
    </>
  );
};

export default Catalog;
