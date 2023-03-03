# React simplest use pagination hook

React use-pagination-hook is a simple hook that allows you to easily implement pagination in your react app.

# Simple example

```js
import {useEffect} from 'react'
import usePagination from 'simplest-react-pagination-hook';


const SomeComponentUsingPagination = () => {
    // Classes are provided by TailwindCSS
    const {pagination, take, skip} = usePagination({
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