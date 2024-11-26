import { RefObject, useEffect } from 'react'

const useInfiniteScroll = (
  callback: () => Promise<any>,
  offset = 300,
  element: RefObject<HTMLDivElement>,
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        element.current &&
        element.current.scrollTop + element.current.clientHeight >=
          element.current.scrollHeight - offset
      ) {
        callback()
      }
    }

    element.current?.addEventListener('scroll', handleScroll)

    return () => element.current?.removeEventListener('scroll', handleScroll)
  }, [callback, offset])
}

export default useInfiniteScroll
