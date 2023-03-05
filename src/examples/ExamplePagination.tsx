import React = require('react');
import usePagination, {UsePaginationProps} from '../index';

const ExamplePagination = (props: UsePaginationProps) => {
  const {pagination, take, skip, currentPage} = usePagination({
    totalItems: props.totalItems,
    totalItemsReferCurrentPage: props.totalItemsReferCurrentPage,
    showCurrentPage: props.showCurrentPage,
    containerClassnames: props.containerClassnames,
    prevPageClassnames: props.prevPageClassnames,
    nextPageClassnames: props.nextPageClassnames,
    currentPageClassnames: props.currentPageClassnames,
    prevPageText: props.prevPageText,
    nextPageText: props.nextPageText,
  });

  return (
    <>
      {pagination}
    </>
  )
}

export default ExamplePagination;
