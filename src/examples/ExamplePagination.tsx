import usePagination from '../index';
import {UsePaginationProps} from '../types/use-pagination-props';
import {useEffect} from 'react';

const ExamplePagination = (props: UsePaginationProps) => {
  const {pagination, take, skip, currentPage} = usePagination({...props});

  useEffect(() => {
    // console.log(pagination, take, skip, currentPage);
  }, [pagination, take, skip, currentPage])

  return (
    <>
      {pagination}
    </>
  )
}

export default ExamplePagination;
