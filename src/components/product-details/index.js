import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useSelector from "../../store/use-selector";
import { numberFormat } from "../../utils";
import "./style.css";

const ProductDetails = () => {
  const [loadProductDetails, addToBasket, store] = useOutletContext();
  const { productId } = useParams();

  const select = useSelector((state) => ({
    asd: state,
    title: state.product.title,
    description: state.product.description,
    madeIn: state.product.madeIn,
    category: state.product.category,
    edition: state.product.edition,
    price: state.product.price,

    addToBasket: state.language.texts.addToBasket,
    manufacturerCountry: state.language.texts.manufacturerCountry,
    type: state.language.texts.category,
    yearOfProduction: state.language.texts.yearOfProduction,
    cost: state.language.texts.price,
  }));

  useEffect(() => {
    store.actions.product.loadProduct(productId);
  }, []);

  return (
    <div className="product">
      <p className="product-description">{select.description}</p>
      <p className="product-madeIn">
        {select.manufacturerCountry} <span>{select.madeIn?.title}</span>
      </p>
      <p className="product-category">
        {select.type} <span>{select.category?.title}</span>
      </p>
      <p className="product-date">
        {select.yearOfProduction} <span>{select.edition}</span>
      </p>
      <p className="product-price">
        {select.cost} <span>{numberFormat(select.price)} ₽</span>
      </p>
      <button className="product-btn" onClick={() => addToBasket(productId)}>
        {select.addToBasket}
      </button>
    </div>
  );
};

export default ProductDetails;
