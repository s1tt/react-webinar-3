import PropTypes from "prop-types";
import React from "react";
import Item from "../item";
import "./style.css";

function List({ list, action, isModalOpen }) {
  return (
    <div className={`List ${isModalOpen ? "List-modal" : ""}`}>
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item item={item} action={action} isModalOpen={isModalOpen} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  action: PropTypes.func,
  isModalOpen: PropTypes.bool,
};

List.defaultProps = {
  action: () => {},
};

export default React.memo(List);
