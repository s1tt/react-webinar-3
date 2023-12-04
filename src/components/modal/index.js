import PropTypes from "prop-types";
import React from "react";
import Button from "../button";
import Head from "../head";
import "./style.css";

const Modal = ({ isModalOpen, setIsModalOpen, children, modalTitle }) => {
  const handleOverlayClick = (e) => {
    if (e.target.className === "Modal") setIsModalOpen(false);
  };

  if (isModalOpen) {
    return (
      <div className="Modal" onClick={(e) => handleOverlayClick(e)}>
        <div className="Modal-wrapper">
          <Head title={modalTitle}>
            <Button onClick={() => setIsModalOpen(false)}>Закрыть</Button>
          </Head>
          {children}
        </div>
      </div>
    );
  }
};

Modal.propTypes = {
  children: PropTypes.node,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  setIsModalOpen: () => {},
};

export default Modal;
