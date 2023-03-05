import {ReactNode, useState} from 'react';
import React = require('react');

export interface UsePaginationProps {
  take?: number;
  showCurrentPage?: boolean;
  totalItems: number;
  totalItemsReferCurrentPage?: boolean;
  prevPageText?: string;
  nextPageText?: string;
  prevPageClassnames?: string;
  currentPageClassnames?: string;
  nextPageClassnames?: string;
  containerClassnames?: string;
}

export interface UsePagination {
  pagination: ReactNode;
  take: number;
  skip: number;
  currentPage: number;
}

const usePagination = ({take = 10, ...props}: UsePaginationProps): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const nextPage = () => {
    if (!nextPageExists()) return;

    setCurrentPage(prevState => prevState + 1);
  }

  const prevPage = () => {
    if (!prevPageExists()) return;

    setCurrentPage(prevState => prevState - 1);
  }

  const nextPageExists = () => {
    if (props.totalItemsReferCurrentPage) {
      return props.totalItems > take;
    }
    return props.totalItems > (currentPage + 1) * take;
  }

  const prevPageExists = () => {
    return currentPage <= 0;
  }

  const getCurrentPage = () => {
    return currentPage + 1;
  }

  const pagination = (
    <>
      <div className={props.containerClassnames}>
        <button
          type={'button'}
          onClick={prevPage}
          className={props.prevPageClassnames}
          disabled={!prevPageExists()}
        >
          {props.prevPageText || 'Prev page'}
        </button>
        {
          props.showCurrentPage ?
            <div className={props.currentPageClassnames}>
              {getCurrentPage()}
            </div> :
            null
        }
        <button
          type={'button'}
          onClick={nextPage}
          className={props.nextPageClassnames}
          disabled={!nextPageExists()}
        >
          {props.nextPageText || 'Next page'}
        </button>
      </div>
    </>
  )

  return {pagination, take, skip: currentPage * take, currentPage};
}

export default usePagination;
