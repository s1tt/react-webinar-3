import PropTypes from "prop-types";
import React from "react";
import Button from "../button";
import CartSummary from "../cartSummary";
import Head from "../head";
import List from "../list";
import "./style.css";

const Modal = ({ isModalOpen, cart, setIsModalOpen, action, finalPrice }) => {
  const handleOverlayClick = (e) => {
    if (e.target.className === "Modal") setIsModalOpen(false);
  };

  if (isModalOpen) {
    return (
      <div className="Modal" onClick={(e) => handleOverlayClick(e)}>
        <div className="Modal-wrapper">
          <Head title="Корзина">
            <Button onClick={() => setIsModalOpen(false)}>Закрыть</Button>
          </Head>
          {cart.length > 0 ? (
            <>
              <List list={cart} isModalOpen={isModalOpen} action={action} />
              <CartSummary isModalOpen={isModalOpen} finalPrice={finalPrice} />
            </>
          ) : (
            <h2 className="Modal-empty">Корзина пуста</h2>
          )}
        </div>
      </div>
    );
  }
};

Modal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  finalPrice: PropTypes.number.isRequired,
};

Modal.defaultProps = {
  setIsModalOpen: () => {},
  action: () => {},
};

export default Modal;
