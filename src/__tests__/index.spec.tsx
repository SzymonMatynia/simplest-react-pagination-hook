import {render, screen} from '@testing-library/react';
import React = require('react');
import ExamplePagination from '../examples/ExamplePagination';



describe('UsePagination', () => {
  it('Prev and Next buttons render given text', () => {
    render(<ExamplePagination totalItems={10} take={10} prevPageText={'Test prev'} nextPageText={'Test next'}/>)
    expect(screen.getByText('Test prev')).toBeInTheDocument();
    expect(screen.getByText('Test next')).toBeInTheDocument();
  });

  it('Does not render go to last page feature if totalItems refer current page', () => {
    render(<ExamplePagination totalItems={10} take={10} goToLastPageText={'Last page'} totalItemsReferCurrentPage={true} prevPageText={'Test prev'} nextPageText={'Test next'}/>)
    expect(screen.queryByText('Last page')).not.toBeInTheDocument();
  });
})
