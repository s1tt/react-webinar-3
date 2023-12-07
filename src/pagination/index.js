import React from "react";
import "./style.css";
import { DOTS, usePagination } from "./use-pagination";
const Pagination = (props) => {
  const { onPageChange, totalItems, siblingCount = 1, currentPage } = props;

  const paginationRange = usePagination({
    currentPage,
    totalItems,
    siblingCount,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className="pagination">
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="dots">
              &#8230;
            </li>
          );
        }

        return (
          <li key={index}>
            <button
              className={`pagination-item ${
                pageNumber === currentPage ? "selected" : ""
              }`}
              onClick={(e) => onPageChange(e, pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
