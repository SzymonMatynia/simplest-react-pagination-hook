import {ReactNode, useState} from 'react';
import React = require('react');

interface Props {
  take?: number;
  showCurrentPage?: boolean;
  totalItems: number;
  prevPageText?: string;
  nextPageText?: string;
  prevPageClassnames?: string;
  currentPageClassnames?: string;
  nextPageClassnames?: string;
  containerClassnames?: string;
}

interface UsePagination {
  pagination: ReactNode;
  take: number;
  skip: number;
}

const usePagination = ({take = 10, ...props}: Props): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const nextPage = () => {
    if (!nextPageExists()) return;

    setCurrentPage(prevState => prevState + 1);
  }

  const prevPage = () => {
    if (currentPage <= 0) return;

    setCurrentPage(prevState => prevState - 1);
  }

  const nextPageExists = () => {
    return props.totalItems > (currentPage + 1) * take;
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
        >
          {props.nextPageText || 'Next page'}
        </button>
      </div>
    </>
  )

  return {pagination, take, skip: currentPage * take};
}

export default usePagination;
