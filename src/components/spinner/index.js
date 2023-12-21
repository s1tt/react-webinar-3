import PropTypes from "prop-types";
import { memo } from "react";
import "./style.css";

function Spinner({ active, children }) {
  if (active) {
    return (
      <div className="Spinner-wrapper">
        {children}
        <div className="Spinner"></div>
      </div>
    );
  } else {
    return children;
  }
}

Spinner.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

Spinner.defaultProps = {};

export default memo(Spinner);
