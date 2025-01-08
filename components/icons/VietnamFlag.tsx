import { SVGProps } from 'react'

export const VietnamFlag = ({ width = 60, height = 30, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width={width} height={height} {...props}>
    <rect width="60" height="30" fill="#da251d"/>
    <polygon points="30,5 35.5,20.5 52,20.5 38.5,30 44,45.5 30,35 16,45.5 21.5,30 8,20.5 24.5,20.5" fill="#ffcd00" transform="scale(0.6)"/>
  </svg>
)

