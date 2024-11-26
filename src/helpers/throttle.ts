const throttle = (
  func: (...args: any[]) => any,
  delay: number = 0,
  options: { leading?: boolean } = { leading: true },
) => {
  let timeout: null | number = null
  return (...args: any[]) => {
    if (timeout) {
      return
    }
    if (options.leading) {
      func(...args)
    }
    timeout = setTimeout(() => {
      if (!options.leading) {
        func(...args)
      }
      timeout = null
    }, delay)
  }
}

export default throttle
