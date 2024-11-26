import React, { ReactElement, useMemo, useState } from 'react'
import useElementSize from '../../hooks/useElementSize'
import throttle from '../../helpers/throttle.ts'

export interface WindowProps {
  rowHeight: number
  children: Array<ReactElement>
  onReachBottom: () => any | (() => Promise<any>)
  className?: string
  gap?: number
}
const bufferedItems = 2

const Window: React.FC<WindowProps> = ({
  rowHeight,
  children,
  onReachBottom,
  className,
  gap = 0,
}) => {
  const [containerRef, { height: containerHeight }] = useElementSize<HTMLDivElement>()
  const [scrollPosition, setScrollPosition] = useState(0)

  const visibleChildren = React.useMemo(() => {
    const startIndex = Math.max(Math.floor(scrollPosition / rowHeight) - bufferedItems, 0)
    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) + bufferedItems,
      children.length - 1,
    )

    return children.slice(startIndex, endIndex + 1).map((child, index) =>
      React.cloneElement(child, {
        key: index,
        style: {
          position: 'absolute',
          top: (startIndex + index) * rowHeight + index * gap,
          height: rowHeight,
          left: 0,
          right: 0,
        },
      }),
    )
  }, [children, containerHeight, rowHeight, scrollPosition, gap])

  const onScroll = useMemo(
    () =>
      throttle(
        function (e: any) {
          const scrollPosition = e.target.scrollTop
          if (scrollPosition > Math.max(children.length * rowHeight - 300, 0)) {
            onReachBottom()
          }
          setScrollPosition(scrollPosition)
        },
        50,
        { leading: false },
      ),
    [children.length, onReachBottom],
  )

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className={className}
      style={{
        overflowY: 'scroll',
        position: 'relative',
      }}
    >
      {visibleChildren}
    </div>
  )
}

export default Window
