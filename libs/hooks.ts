import useSWRInfinite from "swr/infinite"

export const usePagination = <T>(url: string, options?:SWRInfiniteConfiguration) => {
	const PAGE_SIZE = 5;

	const getKey = (pageIndex: number, previousPageData: T[]) => {
    pageIndex = pageIndex + 1;
    return `${url}${pageIndex}&_limit=${PAGE_SIZE}`;
  }

  const {data: posts, size, setSize, error, mutate} = useSWRInfinite(getKey, options)

  const paginatedData:T[] = posts?.flat()

  const isReachedEnd = posts && posts[posts.length - 1]?.length < PAGE_SIZE;
  const loadingMore = posts && typeof posts[size - 1] === "undefined"

  return {
  	paginatedData,
  	isReachedEnd,
  	loadingMore,
  	size,
  	setSize,
  	error,
  	mutate
  }
}