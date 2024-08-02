import React from 'react';
import './Pagination.css';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (pageNumbers.length <= 5) {
      return pageNumbers.map(number => (
        <li key={number}>
          <button
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        </li>
      ));
    } else {
      const dots = '...';
      const firstPage = pageNumbers[0];
      const lastPage = pageNumbers[pageNumbers.length - 1];
      const currentPageGroupStart = Math.max(currentPage - 1, 2);
      const currentPageGroupEnd = Math.min(currentPage + 1, pageNumbers.length - 1);

      const pages = [
        firstPage,
        currentPageGroupStart > 2 && dots,
        ...pageNumbers.slice(currentPageGroupStart - 1, currentPageGroupEnd),
        currentPageGroupEnd < pageNumbers.length - 1 && dots,
        lastPage,
      ];

      return pages.map((number, index) =>
        number === dots ? (
          <li key={`dots-${index}`}>
            <button disabled>{number}</button>
          </li>
        ) : (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          </li>
        )
      );
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
