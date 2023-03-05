import usePagination, {UsePaginationProps} from '../index';
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
