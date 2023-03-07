# React simplest use pagination hook

This is a simple hook that allows you to easily implement pagination in your React app.

This hook can take care of pagination in two cases:
- Your API returns total number of items
- Your API doesn't return total number of items (Then you have to set `totalItemsReferCurrentPage` to `true`, examples below)

# Simple example

### This is how the example looks like:
![gif](https://user-images.githubusercontent.com/31554149/223577311-b1434276-05ca-469c-9a8e-aa19173d9714.gif)

### Code below:
###### Case: your API returns total number of items, you should use this example. (If not, another example is below)
```js
import {useEffect} from 'react';
import usePagination from 'simplest-react-pagination-hook';
import {UsePaginationChangeEvent} from 'simplest-react-pagination-hook/types';

const buttonClasses = 'flex items-center cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

const SomeComponentUsingPagination = () => {

    const onChange = (params: UsePaginationChangeEvent) => {
        console.log(params); // {take: 10, skip: 0, currentPage: 0}
    }
    
    // Classes are provided by TailwindCSS
    const {pagination, take, skip, currentPage} = usePagination({
        totalItems: 80,
        pageRangeDisplayed: 5, // default is 1
        take: 10,
        onChange,
        prevPageText: 'Prev test',
        nextPageText: 'Next test',
        showGoToLastPage: true,
        showGoToFirstPage: true,
        goToFirstPageClassnames: buttonClasses,
        goToLastPageClassnames: buttonClasses,
        containerClassnames: 'flex items-center gap-2 justify-center mt-8',
        currentPageClassnames: buttonClasses,
        prevPageClassnames: buttonClasses,
        nextPageClassnames: buttonClasses,
    });

    useEffect(() => {
        // Here you can handle data fetching or with onChange callback
        console.log(take, skip, currentPage)
    }, [take, skip, currentPage])

    return (
        <div>
            {/* That is how you render the pagination */}
            {pagination}
        </div>

    )
}

```
### Code below:
###### Case: your API doesn't return total number of items - you know only how many items are on the current page. You should use this example.
###### In this case you can't use "Go to last page" because you don't know how many pages are there. You can only use "Go to first page", "Next page", "Prev page" buttons.
```js
import {useEffect} from 'react';
import usePagination from 'simplest-react-pagination-hook';
import {UsePaginationChangeEvent} from 'simplest-react-pagination-hook/types';

const buttonClasses = 'flex items-center cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

const SomeComponentUsingPagination = () => {
    
    const onChange = (params: UsePaginationChangeEvent) => {
        console.log(params); // {take: 10, skip: 0, currentPage: 0}
    }
    
    // Classes are provided by TailwindCSS
    const {pagination, take, skip, currentPage} = usePagination({
        totalItems: 10, // number of items on the current page
        pageRangeDisplayed: 5, // In this example it can only show 1 next page if take === totalItems
        totalItemsReferCurrentPage: true, // this is the only difference from the previous example, but do the trick.
        showCurrentPage: true,
        onChange,
        take: 10, // if take === totalItems in this case, then user is able to go to the next page.
        prevPageText: 'Prev',
        nextPageText: 'Next',
        containerClassnames: 'flex items-center gap-2',
        currentPageClassnames: buttonClasses,
        pageClassnames: buttonClasses,
        prevPageClassnames: buttonClasses,
        nextPageClassnames: buttonClasses,
    });

    useEffect(() => {
        // Here you can handle data fetching or with onChange callback
        console.log(take, skip, currentPage)
    }, [take, skip, currentPage])

    return (
        <div>
            {/* That is how you render the pagination */}
            {pagination}
        </div>

    )
}
```


