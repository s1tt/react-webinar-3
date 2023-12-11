import { memo, useCallback, useEffect } from "react";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import Catalog from "../catalog";

function Main() {
  const store = useStore();
  // const activeModal = useSelector((state) => state.modals.name);

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalItems: state.catalog.totalItems,
    productTitle: state.product?.title || "",

    pageTitle: state.language.texts.pageName,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
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

    loadProductDetails: useCallback(
      (productId) => store.actions.product.loadProduct(productId),
      []
    ),

    clearProductData: useCallback(
      () => store.actions.product.clearProductData(),
      []
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title={select.pageTitle} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          clearProductData={callbacks.clearProductData}
        />
        <Catalog />
      </PageLayout>
    </>
  );
}

export default memo(Main);
