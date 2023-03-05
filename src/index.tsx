import {useEffect, useState} from 'react';
import {UsePaginationProps} from './types/use-pagination-props';
import {UsePagination} from './types/use-pagination';

const usePagination = ({take = 10, ...props}: UsePaginationProps): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Reset current page when total items or take changes
  useEffect(() => {
    setCurrentPage(0);
  }, [props.totalItems, take])

  const handleOnChange = () => {
    if (props.onChange) props.onChange({take, skip: currentPage * take, currentPage})
  }

  const nextPage = () => {
    if (!nextPageExists()) return;

    setCurrentPage(prevState => prevState + 1);
    handleOnChange();
  }

  const prevPage = () => {
    if (!prevPageExists()) return;

    setCurrentPage(prevState => prevState - 1);
    handleOnChange();
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
    handleOnChange();
  }

  const goToLastPage = () => {
    setCurrentPage(Math.floor(props.totalItems / take) - 1);
    handleOnChange();
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
