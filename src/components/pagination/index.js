import React, {memo} from "react";
import PropTypes from "prop-types";
import { usePagination, DOTS } from "../../hooks/pagination";
import {cn as bem} from '@bem-react/classname';
import "./style.css";

const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }) => {
  
  const cn = bem('Pagination');
  
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className={cn()}>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li className={cn('item', 'dots')} key={index}>&#8230;</li>;
        }

        return (
          <li
            key={index}
            className={pageNumber === currentPage ? cn('item', 'selected') : cn('item')}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
    siblingCount: PropTypes.number,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
};

export default memo(Pagination);