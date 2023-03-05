import {render, screen} from '@testing-library/react';
import React = require('react');
import ExamplePagination from '../examples/ExamplePagination';



describe('UsePagination', () => {
  it('Prev and Next buttons render given text', () => {
    render(<ExamplePagination totalItems={100} prevPageText={'Test prev'} nextPageText={'Test next'}/>)
    expect(screen.getByText('Test prev')).toBeInTheDocument();
    expect(screen.getByText('Test next')).toBeInTheDocument();
  });

})
