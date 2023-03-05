import {ReactNode, useEffect, useState} from 'react';

export interface UsePaginationChangeEvent {
  take: number;
  skip: number;
  currentPage: number;
}

export interface UsePaginationProps {
  take?: number;
  showCurrentPage?: boolean;
  showGoToFirstPage?: boolean;
  showGoToLastPage?: boolean;
  totalItems: number;
  totalItemsReferCurrentPage?: boolean;
  prevPageText?: string;
  nextPageText?: string;
  goToFirstPageText?: string;
  goToLastPageText?: string;
  prevPageClassnames?: string;
  pageNumberClassnames?: string;
  nextPageClassnames?: string;
  containerClassnames?: string;
  goToFirstPageClassnames?: string;
  goToLastPageClassnames?: string;
  onChange?: (parameters: UsePaginationChangeEvent) => void;
}

export interface UsePagination {
  pagination: ReactNode;
  take: number;
  skip: number;
  currentPage: number;
}

const usePagination = ({take = 10, ...props}: UsePaginationProps): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    if (props.onChange) props.onChange({take, skip: currentPage * take, currentPage});
  }, [currentPage, take])

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
      return props.totalItems === take;
    }
    return props.totalItems > (currentPage + 1) * take;
  }

  const prevPageExists = () => {
    return currentPage > 0;
  }

  const goToFirstPage = () => {
    setCurrentPage(0);
  }

  const goToLastPage = () => {
    setCurrentPage(Math.floor(props.totalItems / take) - 1);
  }

  const getCurrentPage = () => {
    return currentPage + 1;
  }

  const pagination = (
    <>
      <div className={props.containerClassnames}>
        {
          props.showGoToFirstPage ?
            <button
              type={'button'}
              onClick={goToFirstPage}
              className={props.goToFirstPageClassnames}
              disabled={!prevPageExists()}
            >{props.goToFirstPageText || '<<'}</button> :
            null
        }
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
            <div className={props.pageNumberClassnames}>
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
        {
          (!props.totalItemsReferCurrentPage && props.showGoToLastPage) ?
            <button
              type={'button'}
              onClick={goToLastPage}
              className={props.goToLastPageClassnames}
              disabled={!nextPageExists()}
            >
              {props.goToLastPageText || '>>'}
            </button> :
            null
        }
      </div>
    </>
  )

  return {pagination, take, skip: currentPage * take, currentPage};
}

export default usePagination;
