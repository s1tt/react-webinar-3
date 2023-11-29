import PropTypes from "prop-types";
import React from "react";
import { getLocalPrice } from "../../utils";
import Button from "../button";
import "./style.css";

function Item({ action, isModalOpen, item }) {
  return (
    <div className={`Item ${isModalOpen ? "Item-modal" : ""}`}>
      <div className="Item-title">
        <div className="Item-code">{item.code}</div>
        <p>{item.title}</p>
      </div>
      <div className="Item-details">
        <span>{getLocalPrice(item.price)}</span>
        {isModalOpen && <span>{item.quantity}&nbsp;шт</span>}
      </div>
      <div className="Item-actions">
        <Button onClick={() => action(item.code)}>
          {isModalOpen ? "Удалить" : "Добавить"}
        </Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  action: PropTypes.func,
  isModalOpen: PropTypes.bool,
};

Item.defaultProps = {
  action: () => {},
};

export default React.memo(Item);
