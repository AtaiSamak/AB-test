import { FC } from 'react'

type ArrowProps = {
  className?: string
}

const Arrow: FC<ArrowProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_835_19)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.21173 10.9286C8.01902 11.0474 7.76317 11.0233 7.59612 10.8562L3.35348 6.6136C3.15822 6.41834 3.15822 6.10176 3.35348 5.9065C3.54874 5.71123 3.86532 5.71123 4.06058 5.9065L7.94969 9.7956L11.8388 5.90645C12.0341 5.71119 12.3507 5.71119 12.5459 5.90645C12.7412 6.10171 12.7412 6.41829 12.5459 6.61356L8.3033 10.8562C8.27507 10.8844 8.2443 10.9086 8.21173 10.9286Z"
          fill="#3F4254"
        />
      </g>
      <defs>
        <clipPath id="clip0_835_19">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Arrow
