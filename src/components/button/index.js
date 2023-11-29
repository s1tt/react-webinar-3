import PropTypes from "prop-types";
import React from "react";
import "./styles.css";

const Button = ({ children, onClick }) => {
  return (
    <button className="Button" onClick={onClick} type="button">
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
