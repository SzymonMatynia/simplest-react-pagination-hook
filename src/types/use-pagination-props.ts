import {UsePaginationChangeEvent} from './use-pagination-change-event';

export interface UsePaginationProps {
  pageRangeDisplayed?: number;
  take?: number;
  showGoToFirstPage?: boolean;
  showGoToLastPage?: boolean;
  totalItems: number;
  totalItemsReferCurrentPage?: boolean;
  prevPageText?: string;
  nextPageText?: string;
  goToFirstPageText?: string;
  goToLastPageText?: string;
  prevPageClassnames?: string;
  currentPageClassnames?: string;
  pageClassnames?: string;
  nextPageClassnames?: string;
  containerClassnames?: string;
  goToFirstPageClassnames?: string;
  goToLastPageClassnames?: string;
  onChange?: (parameters: UsePaginationChangeEvent) => void;
}
