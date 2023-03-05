# React simplest use pagination hook

This is a simple hook that allows you to easily implement pagination in your React app.

This hook can take care of pagination in two cases:
- Your API returns total number of items
- Your API doesn't return total number of items (Then you have to set `totalItemsReferCurrentPage` to `true`, examples below)

# Simple example

### This is how the example looks like:
![image](https://user-images.githubusercontent.com/31554149/222844538-3c2adb28-98dd-4415-ab41-4544f8761fb0.png)

### Code below:
###### Case: your API returns total number of items, you should use this example. (If not, another example is below)
```js
import {useEffect} from 'react';
import usePagination from 'simplest-react-pagination-hook';


const SomeComponentUsingPagination = () => {
    // Classes are provided by TailwindCSS
    const {pagination, take, skip, currentPage} = usePagination({
        totalItems: 91,
        showCurrentPage: true,
        take: 20,
        prevPageText: 'Prev',
        nextPageText: 'Next',
        containerClassnames: 'flex items-center gap-2',
        currentPageClassnames: 'flex items-center cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        prevPageClassnames: 'flex items-center cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        nextPageClassnames: 'flex items-center cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    });

    useEffect(() => {
        // here you can handle data fetching
        console.log(take, skip)
    }, [take, skip])

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
```js
import {useEffect} from 'react';
import usePagination from 'simplest-react-pagination-hook';


const SomeComponentUsingPagination = () => {
    // Classes are provided by TailwindCSS
    const {pagination, take, skip, currentPage} = usePagination({
        totalItems: 10, // number of items on the current page
        totalItemsReferCurrentPage: true, // this is the only difference from the previous example, but do the trick.
        showCurrentPage: true,
        take: 20,
        prevPageText: 'Prev',
        nextPageText: 'Next',
        containerClassnames: 'flex items-center gap-2',
        currentPageClassnames: 'flex items-center cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        prevPageClassnames: 'flex items-center cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        nextPageClassnames: 'flex items-center cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    });

    useEffect(() => {
        // here you can handle data fetching
        console.log(take, skip)
    }, [take, skip])

    return (
        <div>
            {/* That is how you render the pagination */}
            {pagination}
        </div>

    )
}
```


