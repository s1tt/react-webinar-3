import React from "react";
import { numberFormat } from "../../utils";
import "./style.css";

const ProductDetails = (props) => {
  const {
    productId,
    description,
    madeIn,
    category,
    edition,
    price,
    addToBasket,
    manufacturerCountryText,
    typeText,
    yearOfProductionText,
    costText,
    addToBasketText,
  } = props;

  return (
    <div className="product">
      <p className="product-description">{description}</p>
      <p className="product-madeIn">
        {manufacturerCountryText} <span>{madeIn}</span>
      </p>
      <p className="product-category">
        {typeText} <span>{category}</span>
      </p>
      <p className="product-date">
        {yearOfProductionText} <span>{edition}</span>
      </p>
      <p className="product-price">
        {costText} <span>{numberFormat(price)} ₽</span>
      </p>
      <button className="product-btn" onClick={() => addToBasket(productId)}>
        {addToBasketText}
      </button>
    </div>
  );
};

export default ProductDetails;
