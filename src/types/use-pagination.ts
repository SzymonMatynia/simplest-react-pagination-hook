import {ReactNode} from 'react';

export interface UsePagination {
  pagination: ReactNode;
  take: number;
  skip: number;
  currentPage: number;
}
