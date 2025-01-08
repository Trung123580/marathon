import { SVGProps } from 'react'

export const EnglishFlag = ({ width = 60, height = 30, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width={width} height={height} {...props}>
    <clipPath id="t">
      <path d="M0 0v30h60V0z"/>
    </clipPath>
    <clipPath id="s">
      <path d="M30 15V0h15zM0 0v15h15zM30 30V15h15zM15 30V15H0z"/>
    </clipPath>
    <g clipPath="url(#t)">
      <path d="M0 0v30h60V0z" fill="#012169"/>
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6"/>
      <path d="M0 0l60 30M60 0L0 30" clipPath="url(#s)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
)

