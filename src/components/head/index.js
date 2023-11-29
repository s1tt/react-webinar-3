import PropTypes from "prop-types";
import React from "react";
import "./style.css";

function Head({ title, children }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {children && <div className="Head-action">{children}</div>}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default React.memo(Head);
