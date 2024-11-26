import { RefObject, useEffect, useRef } from 'react'

const useOnClickOutside = <T extends HTMLDivElement = HTMLDivElement>(
  handler: (event: Event) => void,
) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])

  return ref as RefObject<T>
}

export default useOnClickOutside
