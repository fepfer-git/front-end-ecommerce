import React from "react";
import "../styles/Pagination.css";

const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((page, index) => (
        <button
          className={page == currentPage ? "active" : ""}
          key={index}
          onClick={() => paginate(page)}
        >
          {" "}
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
