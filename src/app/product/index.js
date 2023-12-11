import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import ProductDetails from "../../components/product-details";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import "./style.css";

const Product = () => {
  const store = useStore();
  const { productId } = useParams();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,

    title: state.product.title,
    description: state.product.description,
    madeIn: state.product.madeIn,
    category: state.product.category,
    edition: state.product.edition,
    price: state.product.price,

    manufacturerCountryText: state.language.texts.manufacturerCountry,
    typeText: state.language.texts.category,
    yearOfProductionText: state.language.texts.yearOfProduction,
    costText: state.language.texts.price,
    addToBasketText: state.language.texts.addToBasket,
    productNotFoundText: state.language.texts.productNotFound,
  }));

  useEffect(() => {
    store.actions.product.loadProduct(productId);
  }, [productId]);

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),

    clearProductData: useCallback(
      () => store.actions.product.clearProductData(),
      []
    ),
  };

  return (
    <PageLayout>
      <Head title={select.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        clearProductData={callbacks.clearProductData}
      />
      {store.state.product._id ? (
        <ProductDetails
          productId={productId}
          description={select.description}
          madeIn={select.madeIn.title}
          category={select.category?.title}
          edition={select.edition}
          price={select.price}
          addToBasket={callbacks.addToBasket}
          manufacturerCountryText={select.manufacturerCountryText}
          typeText={select.typeText}
          yearOfProductionText={select.yearOfProductionText}
          costText={select.costText}
          addToBasketText={select.addToBasketText}
        />
      ) : (
        <h2 className="product-not-found">{select.productNotFoundText}</h2>
      )}
    </PageLayout>
  );
};

export default Product;
