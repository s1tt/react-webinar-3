import PropTypes from "prop-types";
import React from "react";
import { getLocalPrice, plural } from "../../utils";
import Button from "../button";
import "./style.css";

const CartSummary = ({
  setIsModalOpen,
  isModalOpen,
  finalPrice,
  quantityOfGoods,
}) => {
  if (isModalOpen) {
    return (
      <div className={`CartSummary ${isModalOpen ? "CartSummary-modal" : ""}`}>
        <div
          className={`CartSummary-content ${
            isModalOpen ? "CartSummary-content-modal" : ""
          }`}
        >
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
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func,
  finalPrice: PropTypes.number.isRequired,
  quantityOfGoods: PropTypes.number,
};

CartSummary.defaultProps = {
  setIsModalOpen: () => {},
};

export default CartSummary;
