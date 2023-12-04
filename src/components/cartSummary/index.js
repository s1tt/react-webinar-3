import PropTypes, { number } from "prop-types";
import React from "react";
import { getLocalPrice, plural } from "../../utils";
import Button from "../button";
import "./style.css";

const CartSummary = ({ setIsModalOpen, cartSummary, type }) => {
  const { finalPrice = 0, quantityOfGoods = 0 } = cartSummary;

  if (type === "modal") {
    return (
      <div className="CartSummary CartSummary-modal">
        <div className="CartSummary-content CartSummary-content-modal">
          <b className="CartSummary-sum">Итого</b>
          <b className="CartSummary-sum">{getLocalPrice(finalPrice)}</b>
        </div>
      </div>
    );
  }
  return (
    <div className="CartSummary">
      <div className="CartSummary-content">
        <span className="CartSummary-title">В корзине:</span>
        <b className="CartSummary-sum">
          {quantityOfGoods
            ? `${quantityOfGoods} ${plural(quantityOfGoods, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${getLocalPrice(finalPrice)}`
            : "пусто"}
        </b>

        <div className="CartSummary-action">
          <Button onClick={() => setIsModalOpen(true)}>Перейти</Button>
        </div>
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  cartSummary: PropTypes.shape({
    finalPrice: number,
    quantityOfGoods: number,
  }).isRequired,

  setIsModalOpen: PropTypes.func,
  type: PropTypes.oneOf(["modal", "page"]).isRequired,
};

CartSummary.defaultProps = {
  setIsModalOpen: () => {},
};

export default CartSummary;
