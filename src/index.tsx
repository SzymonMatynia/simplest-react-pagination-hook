import {useEffect, useState} from 'react';
import {UsePaginationProps} from './types/use-pagination-props';
import {UsePagination} from './types/use-pagination';

const usePagination = ({take = 10, pageRangeDisplayed = 1, ...props}: UsePaginationProps): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = Math.ceil(props.totalItems / take);

  const isPageInRange = (pageIndex: number) => {
    if (props.totalItemsReferCurrentPage) {
      return pageIndex >= 0;
    }
    return pageIndex >= 0 && pageIndex < totalPages;
  }

  // Reset current page when total items or take changes
  useEffect(() => {
    if (props.totalItemsReferCurrentPage) return;
    setCurrentPage(0);

  }, [props.totalItems, take])

  // It doesn't reset on totalItems change because it would reset the pagination on last page (it is based on requests)
  useEffect(() => {
    if (!props.totalItemsReferCurrentPage) return;
    setCurrentPage(0);
  }, [take])

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

  // refactor is coming
  const getPageIndexesToDisplay = () => {
    if (!pageRangeDisplayed) return [];


    if (pageRangeDisplayed === 1) {
      return [currentPage];
    }

    const pagesBeforeSupplement = [];
    const pagesBefore = [];
    const pagesAfter = [];

    const sidePagesQuantity = pageRangeDisplayed - 1

    let possiblePageBefore = Math.floor(sidePagesQuantity / 2);
    let possiblePageAfter = Math.ceil(sidePagesQuantity / 2);

    if (props.totalItemsReferCurrentPage) {
      possiblePageBefore = take === props.totalItems ? sidePagesQuantity - 1 : sidePagesQuantity;
      possiblePageAfter = take === props.totalItems ? 1 : 0;
    }


    if (currentPage === totalPages - 1 && possiblePageAfter > 0 && !props.totalItemsReferCurrentPage) {
      possiblePageBefore += possiblePageAfter;
      possiblePageAfter = 0;
    }

    if (currentPage > 0 && possiblePageBefore > 0) {

      const loopCondition = possiblePageBefore;

      for (let i = loopCondition; i >= 1; i--) {
        if (isPageInRange(currentPage - i)) {
          possiblePageBefore--;
          pagesBefore.push(currentPage - i);
        }
      }
    }


    if (possiblePageBefore > 0 && possiblePageAfter > 0 && !props.totalItemsReferCurrentPage) {
      possiblePageAfter += possiblePageBefore;
      possiblePageBefore = 0;
    }

    if ((currentPage < totalPages - 1 && possiblePageAfter > 0) || (props.totalItemsReferCurrentPage && possiblePageAfter > 0)) {

      const loopCondition = possiblePageAfter;

      for (let i = 1; i <= loopCondition; i++) {
        if (isPageInRange(currentPage + i)) {
          possiblePageAfter--;
          pagesAfter.push(currentPage + i);
        } else {
          break;
        }
      }
    }

    // supplement the missing elements
    if (possiblePageAfter > 0 && !props.totalItemsReferCurrentPage) {
      const loopCondition = possiblePageAfter;
      for (let i = loopCondition; i >= 1; i--) {
        const supplementaryPageIndex = (pagesBefore[0] ? pagesBefore[0] : currentPage) - i;
        if (isPageInRange(supplementaryPageIndex)) {
          possiblePageAfter--;
          pagesBeforeSupplement.push(supplementaryPageIndex);
        }
      }
    }

    return [
      ...pagesBeforeSupplement,
      ...pagesBefore,
      currentPage,
      ...pagesAfter
    ];
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
          getPageIndexesToDisplay().map((pageIndex) => {
            return (
              <button key={pageIndex}
                      className={currentPage === pageIndex ? props.currentPageClassnames : props.pageClassnames}>
                {pageIndex + 1}
              </button>
            )
          })
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
