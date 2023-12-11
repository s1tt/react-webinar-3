import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navigation = ({ clearProductData, mainLinkText }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link
            className="navbar-link"
            to={"/"}
            onClick={() => clearProductData()}
          >
            {mainLinkText}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
